import styles from "./MainSlider.module.css";
import { questions } from "@/utils/QuestionJson";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import CallApi from "@/utils/CallApi";
import XaiPopup from "@/components/shared/popups/desktop/XaiPopup";
import {
  addCounterQuestionIndex,
  setChanceData,
  setGroupedXai,
  setNextPredictBackup,
  setNextPredictData,
  setPotentialData,
} from "@/store/features/predictSlice";
import ProgressBar from "@/components/shared/ProgressBar";
import ChartsBox from "@/components/steps/desktop/main/comp/ChartsBox";
import dynamic from "next/dynamic";
import QuestionBox from "./comp/QuestionBox";
import ChancePotentialBox from "./comp/ChancePotentialBox";
const ChacnePotentialModalDesktop = dynamic(() =>
  import("@/components/shared/popups/desktop/ChancePotentialModalDesktop")
);
const SimilarDocsPopupDesktop = dynamic(() =>
  import("@/components/shared/popups/desktop/SimilarDocsPopupDesktop")
);
const VideoPlayer = dynamic(() => import("@/components/shared/VideoPlayer"));

export default function MainSlider({ name, setName }) {
  const dispatch = useDispatch();
  const [questionCounter, setQuestionCounter] = useState(1);
  const [testValue, setTestValue] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chanceHistory, setChanceHistory] = useState([]);
  const predict = useSelector((state) => state.predict);
  const slider = useSelector((state) => state.slider);
  const [chancePotentialPopup, setChancePotentialPopup] = useState({
    value: false,
    type: "",
  });
  const [chartSelected, setChartSelected] = useState("bar");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictData, setPredictData] = useState({});
  const [prevCounterQuestion, setPrevCounterQuestion] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [finsihed, setFinished] = useState(false);
  const [openSimilarDocsPopup, setOpenSimilarDocsPopup] = useState(false);
  const [contactUs, setContatcUs] = useState(false);
  const [videoPopup, setVideoPopup] = useState(false);
  const [similarDocsData, setSimilarDocsData] = useState([]);
  const [responseExplain, setResponseExplain] = useState([]);
  const charts = useSelector((state) => state.charts);

  function isNumberIncreasing(previousNumber, currentNumber) {
    return currentNumber > previousNumber
      ? "more"
      : currentNumber < previousNumber
      ? "low"
      : currentNumber === previousNumber
      ? "equal"
      : "";
  }

  const handleChange = (value, type, key) => {
    console.log(value);
    console.log(type);
    if (type === "number") {
      setAnswer(Number(value));
    } else if (type === "radio_multi") {
      if (answer === null) {
        setAnswer((prev) => [...(prev || []), value]);
      } else if (answer.includes(value)) {
        setAnswer((prev) => prev.filter((item) => item !== value));
      } else {
        setAnswer((prev) => [...(prev || []), value]);
      }
    } else if (type === "radio_unique") {
      console.log(key)
      setAnswer((prev) => {
        const updatedAnswer = [...(prev || [])];
        const existingIndex = updatedAnswer.findIndex(item => item.hasOwnProperty(key));
        if (existingIndex !== -1) {
          updatedAnswer[existingIndex] = { [key]: value };
        } else {
          updatedAnswer.push({ [key]: value });
        }
        return updatedAnswer;
      });
    } else {
      setAnswer(value);
    }
  };

  console.log(answer);

  const handleSubmit = async () => {
    setLoading(true);

    const filteredData = {
      ...predictData,
      [questions[currentQuestionIndex].question_value]:
        questions[currentQuestionIndex].type === "number"
          ? Number(answer)
          : questions[currentQuestionIndex].type === "radio_multi"
          ? answer
          : questions[currentQuestionIndex].answer.value_en[answer],
    };

    await CallApi.post("/predict", filteredData)
      .then(async (respon) => {
        if (!respon.data.next_variable) {
          await fetch(`/api/user-chance`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              chance: chanceHistory[chanceHistory.length - 1].chance,
            }),
          }).then(async (res) => {
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/artificial_records?acceptance_rate=${
                chanceHistory[chanceHistory.length - 1].chance / 100
              }&number_of_records=5`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: null,
              }
            ).then(async (res) => {
              const data = await res.json();
              setSimilarDocsData(data);
            });
          });
          setActiveButton("");
          setAnswer(null);
          setLoading(false);
          setFinished(true);
          setName("");
          return;
        } else {
          await CallApi.post("/grouped_xai", filteredData)
            .then(async (resp) => {
              dispatch(setGroupedXai({ data: resp.data }));

              await CallApi.post("/potential", filteredData)
                .then(async (response) => {
                  await CallApi.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/response_explain`,
                    filteredData,
                    {
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((res) => {
                      setResponseExplain(res.data);
                    })
                    .catch((err) => {});
                  dispatch(setPotentialData(response.data.result));
                  setChanceHistory((prev) => [
                    ...prev,
                    {
                      question: questions[currentQuestionIndex].question_value,
                      answer: answer,
                      chance: Math.round(Number(respon.data.result) * 100),
                      potential: Math.round(Number(response.data.result) * 100),
                      chartData: Object.values(resp.data.aggregated_shap_values).map((value) =>
                        (value * 100).toFixed(2)
                      ),
                    },
                  ]);
                  if (predict.countAnswer === 1) {
                    dispatch(addCounterQuestionIndex({ payload: "" }));
                    setPrevCounterQuestion([
                      {
                        type: "sex",
                        questionIndex: 0,
                        chance: Math.round(Number(resp.data.result) * 100),
                        chartValues: predict.chartDataValues,
                        countAnswer: predict.countAnswer,
                        answer: testValue,
                        activeButton: activeButton,
                        potential: Math.round(Number(response.data.result) * 100),
                      },
                    ]);
                  } else {
                    dispatch(addCounterQuestionIndex({ change: true }));
                    setPrevCounterQuestion([
                      ...prevCounterQuestion,
                      {
                        type: predict.nextPredict,
                        questionIndex: predict.questionIndex,
                        chance: Math.round(Number(resp.data.result) * 100),
                        chartValues: predict.chartDataValues,
                        countAnswer: predict.countAnswer,
                        answer: testValue,
                        activeButton: activeButton,
                        potential: Math.round(Number(response.data.result) * 100),
                      },
                    ]);
                  }
                  setActiveButton("");
                  setAnswer(null);
                  setLoading(false);
                  setQuestionCounter((prev) => prev + 1);
                  setAnimate((prev) => !prev);

                  setCurrentQuestionIndex(
                    questions.findIndex(
                      (question) => question.question_value === respon.data.next_variable
                    )
                  );
                  dispatch(setChanceData({ chance: respon.data.result }));
                  dispatch(setNextPredictData({ nextVariable: respon.data.next_variable }));
                  dispatch(setNextPredictBackup({ nextVariable: respon.data.next_variable }));
                  setNextPredictData({ ...predictData, [respon.data.next_variable]: "" });
                  setPredictData(filteredData);
                })
                .catch((error) => {});
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (questions[currentQuestionIndex].type === "number") {
      setAnswer(questions[currentQuestionIndex].answer.value_fa[0]);
    }
  }, [questionCounter]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--potential",
      String(800 - 800 * (predict.potential / 100))
    );
    document.documentElement.style.setProperty(
      "--progress",
      String(800 - 800 * (predict.chance / 100))
    );
  }, [predict.potential, predict.chance]);

  const handleSetActiveChart = (value) => {
    setChartSelected(value);
  };

  console.log(predictData);

  return (
    <div key={slider.name} className={`${styles.mainSliderPage} `}>
      <Navbar />

      <div className={`${styles.mainSlider} ${styles.slideDown}`}>
        <div className={styles.mainSliderRight}>
          <QuestionBox
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            answer={answer}
            setAnswer={setAnswer}
            questionCounter={questionCounter}
            loading={loading}
            finsihed={finsihed}
            setOpenSimilarDocsPopup={setOpenSimilarDocsPopup}
            setVideoPopup={setVideoPopup}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />

          <ChancePotentialBox
            setChancePotentialPopup={setChancePotentialPopup}
            chanceHistory={chanceHistory}
            isNumberIncreasing={isNumberIncreasing}
          />
        </div>

        <ChartsBox
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          questionCounter={questionCounter}
          chanceHistory={chanceHistory}
          chartSelected={chartSelected}
          handleSetActiveChart={handleSetActiveChart}
          responseExplain={responseExplain}
        />
      </div>

      <Footer />

      <div
        onClick={() => setChancePotentialPopup({ value: false, type: "" })}
        className={
          chancePotentialPopup.value ? styles.popupBoxAnimation : styles.popupBoxAnimationNot
        }
      >
        {chancePotentialPopup.value && (
          <ChacnePotentialModalDesktop
            chancePotentialPopup={chancePotentialPopup}
            setChancePotentialPopup={setChancePotentialPopup}
            isNumberIncreasing={isNumberIncreasing}
            chanceHistory={chanceHistory}
            number={predict.chance}
          />
        )}
      </div>

      <div className={openSimilarDocsPopup ? styles.similarDocsPopup : styles.similarDocsPopupNot}>
        <SimilarDocsPopupDesktop
          contactUs={contactUs}
          setContatcUs={setContatcUs}
          setOpenSimilarDocsPopup={setOpenSimilarDocsPopup}
          chance={chanceHistory[chanceHistory.length - 1]?.chance}
          similarDocsData={similarDocsData}
        />
      </div>

      <div className={charts.name ? styles.videoPopup : styles.videoPopupNot}>
        <XaiPopup responseExplain={responseExplain} />
      </div>

      <div className={videoPopup || contactUs ? styles.videoPopup : styles.videoPopupNot}>
        {videoPopup && (
          <VideoPlayer
            videoPopup={videoPopup}
            setContactUsPopup={setContatcUs}
            setVideoPopup={setVideoPopup}
          />
        )}

        {!videoPopup && contactUs && (
          <SimilarDocsPopupDesktop
            contactUs={contactUs}
            setContatcUs={setContatcUs}
            setOpenSimilarDocsPopup={setOpenSimilarDocsPopup}
            setVideoPopup={setVideoPopup}
            chance={chanceHistory[chanceHistory.length - 1]?.chance}
            similarDocsData={similarDocsData}
          />
        )}
      </div>
    </div>
  );
}
