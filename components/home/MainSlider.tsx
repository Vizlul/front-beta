import { Button, InputNumber, Progress, Select, Slider } from "antd";
import MyChart from "../utils/chart/Chart";
import SliderComponent from "../utils/slider/SliderComponent";
import styles from "./MainSlider.module.css";
import { questions } from "@/utils/QuestionJson";
import { useDispatch, useSelector } from "react-redux";
import {
  PredictInterface,
  addCountAnswer,
  addCountQuestion,
  addCounterQuestionIndex,
  minusCountQuestion,
  setChanceData,
  setCountAnswer,
  setCountQuestion,
  setGroupedXai,
  setNextPredictBackup,
  setNextPredictData,
  setPotentialData,
} from "@/store/features/predictSlice";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import CallApi from "@/utils/CallApi";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { setToFinished } from "@/store/features/sliderSlice";
import Modal from "../utils/modal/Modal";

export default function MainSlider() {
  const predict = useSelector((state: { predict: PredictInterface }) => state.predict);
  const dispatch = useDispatch();
  const [swiper, setSwiper] = useState(null);
  const [questionCounter, setQuestionCounter] = useState<any>(0);
  const [editMode, setEditMode] = useState(false);
  const [editChanges, setEditChanges] = useState(false);
  const [editKeyChanges, setEditkeyChanges] = useState("");
  const [editData, setEditData] = useState<any[]>([]);
  const [predictData, setPredictData] = useState<any>({});
  const [testValue, setTestValue] = useState("");
  const [activeButton, setActiveButton] = useState<any>("");
  const [prevCounterQuestion, setPrevCounterQuestion] = useState<any[]>([]);
  const [mobileSize, setMobileSize] = useState<boolean>(false);
  const [loading, setLoading] = useState(false)

  const handleChange = (value: any) => {
    if (editMode) {
      setEditChanges(true);
    }
    setTestValue(value.value);
    const lastKey = questions[predict.questionIndex].question_value;
    setEditkeyChanges(lastKey);

    if (lastKey === questions[predict.questionIndex].question_value) {
      if (predict.questionIndex === 0) {
        setPredictData({
          ...predictData,
          sex: value.value,
        });
        setPrevCounterQuestion((prev) => {
          const index = prevCounterQuestion.findIndex((item) => item.type === lastKey);
          if (index !== -1) {
            prev[index] = { ...prev[index], answer: value.value };
          }
          return [...prev];
        });
        if (!editMode) {
          setEditData((prev) => [...prev, "sex"]);
        }
      } else {
        setPredictData({
          ...predictData,
          [lastKey]: value.value,
        });
        setPrevCounterQuestion((prev) => {
          const index = prevCounterQuestion.findIndex((item) => item.type === lastKey);
          if (index !== -1) {
            prev[index] = { ...prev[index], answer: value.value };
          }
          return [...prev];
        });
        if (!editMode) {
          setEditData((prev) => [...prev, lastKey]);
        }
      }
    } else {
      setPredictData({
        ...predictData,
        [questions[predict.questionIndex].question_value]: value.value,
      });
      if (!editMode) {
        setEditData((prev) => [...prev, [questions[predict.questionIndex].question_value]]);
      }
    }
  };

  const handleSelectedChoice = (index: number | any) => {
    if (editMode) {
      setEditChanges(true);
    }
    setActiveButton(index);
    const lastKey = predict.nextPredict;
    setEditkeyChanges(lastKey);
    console.log("test");

    if (lastKey === predict.nextPredict) {
      if (predict.questionIndex === 0) {
        const valueEn = questions[predict.questionIndex]?.answer?.value_en;
        console.log(valueEn);
        setTestValue(valueEn[index]);
        if (valueEn) {
          setPredictData({
            ...predictData,
            sex: valueEn[index],
          });
          setPrevCounterQuestion((prev) => {
            const indexx = prevCounterQuestion?.findIndex((item) => item.type === lastKey);
            if (indexx !== -1) {
              prev[indexx] = { ...prev[indexx], answer: valueEn[index], activeButton: index };
            }
            return [...prev];
          });
          if (!editMode) {
            setEditData((prev) => [...prev, "sex"]);
          }
        }
      } else {
        const valueEn = questions[predict.questionIndex]?.answer?.value_en;
        if (valueEn) {
          setPredictData({
            ...predictData,
            [lastKey]: valueEn[index],
          });
          setPrevCounterQuestion((prev) => {
            const indexx = prevCounterQuestion?.findIndex((item) => item.type === lastKey);
            if (indexx !== -1) {
              prev[indexx] = { ...prev[indexx], answer: valueEn[index], activeButton: index };
            }
            return [...prev];
          });
          if (!editMode) {
            setEditData((prev) => [...prev, lastKey]);
          }
        }
      }
    } else {
      const questionValue = questions[predict.questionIndex]?.question_value;
      const valueEn = questions[predict.questionIndex]?.answer?.value_en;
      console.log(valueEn);
      if (questionValue && valueEn) {
        setPredictData({
          ...predictData,
          [questionValue]: valueEn[index],
        });
        setPrevCounterQuestion((prev) => {
          const indexx = prevCounterQuestion?.findIndex((item) => item.type === lastKey);
          if (indexx !== -1) {
            prev[indexx] = { ...prev[indexx], answer: valueEn[index], activeButton: index };
          }
          return [...prev];
        });
        if (!editMode) {
          setEditData((prev) => [...prev, questionValue]);
        }
      }
    }
  };

  const handleSelectedChoiceNumber = (value: number | any) => {
    if (editMode) {
      setEditChanges(true);
    }
    setTestValue(value);
    const lastKey = predict.nextPredict;
    setEditkeyChanges(lastKey);

    if (lastKey === predict.nextPredict) {
      setPredictData({
        ...predictData,
        [lastKey]: value,
      });
      setPrevCounterQuestion((prev) => {
        const index = prevCounterQuestion.findIndex((item) => item.type === lastKey);
        if (index !== -1) {
          prev[index] = { ...prev[index], answer: value };
        }
        return [...prev];
      });
      if (!editMode) {
        setEditData((prev) => [...prev, lastKey]);
      }
    } else {
      setPredictData({
        ...predictData,
        [predict.nextPredict]: value,
      });
      setPrevCounterQuestion((prev) => {
        const index = prevCounterQuestion.findIndex((item) => item.type === lastKey);
        if (index !== -1) {
          prev[index] = { ...prev[index], answer: value };
        }
        return [...prev];
      });
      if (!editMode) {
        setEditData((prev) => [...prev, predict.nextPredict]);
      }
    }
  };

  console.log(predict.questionNumber);
  console.log(predict.countAnswer);
  console.log(questionCounter);

  const handleSubmit = async () => {
    // console.log(questionCounter);
    if (editMode && editChanges) {
      setQuestionCounter((prev) => prev + 1);
      console.log("edit true");
      const newState: any = [];
      let keep = false;

      for (let i = editData.length - 1; i >= 0; i--) {
        const key = editData[i];
        if (key === editKeyChanges) {
          keep = true;
        }
        if (keep) {
          if (!newState.includes(key)) {
            newState.unshift(key);
          }
        }
      }

      console.log(newState);

      const filteredData: any = {};
      const filteredDataTest: any = [];

      for (const key of newState) {
        if (key in predictData) {
          filteredData[key] = predictData[key];
        }
      }
      console.log(filteredData);
      setPredictData("");
      setPredictData(filteredData);
      console.log(predictData);

      console.log(newState);
      for (const key of newState) {
        const matchingObject = prevCounterQuestion.find((obj) => obj.type === key);
        if (matchingObject) {
          filteredDataTest.push(matchingObject);
        }
      }

      setPrevCounterQuestion(filteredDataTest);

      console.log(filteredDataTest);

      await CallApi.post("/predict", filteredData)
        .then(async (resp) => {
          dispatch(setChanceData({ chance: resp.data.result }));
          dispatch(setNextPredictData({ nextVariable: resp.data.next_variable }));
          dispatch(setNextPredictBackup({ nextVariable: resp.data.next_variable }));
          setPredictData({ ...filteredData, [resp.data.next_variable]: "" });
          await CallApi.post("/grouped_xai", filteredData).then(async (resp) => {
            dispatch(setGroupedXai({ data: resp.data }));
            await CallApi.post("/potential", filteredData)
              .then((resp) => {
                dispatch(setPotentialData(resp.data.result));
              })
              .catch((error) => {
                console.log(error);
              });
            if (predict.countAnswer === 1) {
              dispatch(addCounterQuestionIndex({ payload: "" }));
              // setPrevCounterQuestion([
              //   {
              //     type: "sex",
              //     questionIndex: 0,
              //     chance: predict.chance,
              //     chartValues: predict.chartDataValues,
              //     countAnswer: predict.countAnswer,
              //     answer: testValue,
              //     activeButton: activeButton,
              //   },
              // ]);
            } else {
              dispatch(addCounterQuestionIndex({ change: true }));
              // setPrevCounterQuestion([
              //   ...prevCounterQuestion,
              //   {
              //     type: predict.nextPredict,
              //     questionIndex: predict.questionIndex,
              //     chance: predict.chance,
              //     chartValues: predict.chartDataValues,
              //     countAnswer: predict.countAnswer,
              //     answer: testValue,
              //     activeButton: activeButton,
              //   },
              // ]);
            }
            dispatch(addCountQuestion());
            dispatch(setCountAnswer());
            setTestValue("");
            setEditMode(false);
            setQuestionCounter((prev) => prev + 1);
            // dispatch(addCountAnswer());
            setActiveButton("");
          });
        })
        .catch((error) => {
          // if (error.response.data.detail.includes("max")) {
          //   dispatch(setToFinished());
          // }
          console.log(error);
        });
    } else if (editMode && predict.countAnswer > predict.questionNumber + 1) {
      setQuestionCounter((prev) => prev + 1);
      dispatch(setNextPredictData({ nextVariable: prevCounterQuestion[questionCounter - 1].type }));
      setTestValue(prevCounterQuestion[questionCounter - 1].answer);
      dispatch(addCountQuestion());
      dispatch(addCounterQuestionIndex({ change: true }));
      dispatch(setChanceData({ chance: prevCounterQuestion[questionCounter - 1].chance }));
      dispatch(setPotentialData(prevCounterQuestion[questionCounter - 1].potential));
    } else {
      setQuestionCounter((prev) => prev + 1);

      console.log("edit false");
      if (predict.countAnswer === predict.questionNumber) {
        await CallApi.post("/predict", predictData)
          .then(async (respo) => {
            if (!respo.data.next_variable) {
              return dispatch(setToFinished());
            }
            dispatch(setChanceData({ chance: respo.data.result }));
            dispatch(setNextPredictData({ nextVariable: respo.data.next_variable }));
            dispatch(setNextPredictBackup({ nextVariable: respo.data.next_variable }));
            setPredictData({ ...predictData, [respo.data.next_variable]: "" });
            await CallApi.post("/grouped_xai", predictData).then(async (resp) => {
              dispatch(setGroupedXai({ data: resp.data }));
              await CallApi.post("/potential", predictData)
                .then((response) => {
                  console.log(response);
                  dispatch(setPotentialData(response.data.result));

                  if (predict.countAnswer === 1) {
                    dispatch(addCounterQuestionIndex({ payload: "" }));
                    console.log(predict.chance);
                    setPrevCounterQuestion([
                      {
                        type: "sex",
                        questionIndex: 0,
                        chance: Math.round(Number(respo.data.result) * 100),
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
                        chance: Math.round(Number(respo.data.result) * 100),
                        chartValues: predict.chartDataValues,
                        countAnswer: predict.countAnswer,
                        answer: testValue,
                        activeButton: activeButton,
                        potential: Math.round(Number(response.data.result) * 100),
                      },
                    ]);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });

              setTestValue("");
              dispatch(addCountAnswer());
              setActiveButton("");
            });
          })
          .catch((error) => {
            // if (error.response.data.detail.includes("max")) {
            //   dispatch(setToFinished());
            // }
            console.log(error);
          });
      } else {
        if (predict.questionNumber === prevCounterQuestion.length) {
          dispatch(setNextPredictData({ nextVariable: predict.nextPredictBackup }));
          dispatch(addCountQuestion());
          dispatch(addCounterQuestionIndex({ change: true }));
          setTestValue("");
          setEditMode(false);
          setEditChanges(false);
        } else {
          setTestValue(prevCounterQuestion[predict.questionNumber].answer);
          dispatch(setNextPredictData({ nextVariable: prevCounterQuestion[predict.questionNumber].type }));
          dispatch(setChanceData({ chance: prevCounterQuestion[predict.questionNumber].chance }));
          dispatch(addCountQuestion());
          setQuestionCounter((prev) => prev + 1);
          dispatch(addCounterQuestionIndex({ change: true }));
        }
      }
    }
  };

  function isNumberIncreasing(previousNumber: any, currentNumber: any) {
    console.log(currentNumber, previousNumber);
    return currentNumber > previousNumber
      ? "more"
      : currentNumber < previousNumber
      ? "low"
      : currentNumber === previousNumber
      ? "equal"
      : "";
  }

  const handleBack = () => {
    setEditMode(true);
    setTestValue(prevCounterQuestion[questionCounter - 2].answer);
    setActiveButton(prevCounterQuestion[questionCounter - 2].activeButton);
    dispatch(setNextPredictData({ nextVariable: prevCounterQuestion[questionCounter - 2].type }));
    dispatch(setChanceData({ chance: prevCounterQuestion[questionCounter - 2].chance }));
    dispatch(setPotentialData(prevCounterQuestion[questionCounter - 2].potential));
    dispatch(minusCountQuestion());
    dispatch(addCounterQuestionIndex({ change: true }));

    if (questionCounter > 2) {
      setQuestionCounter((prev) => prev - 1);
    }
  };

  // useEffect(() => {
  //   if () {
  //     setMobileSize(true);
  //   }
  // }, []);

  useEffect(() => {
    if (predict.questionIndex > 0) {
      dispatch(addCounterQuestionIndex({ change: true }));
    }
    if (predict.countAnswer === predict.questionNumber) {
      setEditMode(false);
      setQuestionCounter(predict.countAnswer);
    }
  }, [predict.questionIndex]);

  useEffect(() => {
    setQuestionCounter(predict.countAnswer);
    dispatch(setCountQuestion());
  }, [predict.countAnswer]);

  console.log(prevCounterQuestion);

  return (
    <div className={styles.mainSlider}>
      {window.innerWidth < 768 ? (
        <>
          <div
            className={styles.mainSliderLeft}
            style={{
              background: "#fff",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              padding: "10px",
            }}
          >
            <MyChart questionCounter={questionCounter} prevCounterQuestion={prevCounterQuestion} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: 'center', gap: "6px", textDecoration: "underline" }}>
                <Modal title="شغلی" />
              </div>
              <div style={{ display: "flex", alignItems: 'center', gap: "6px", textDecoration: "underline" }}>
                <Modal title="عاطفی" />
              </div>
              <div style={{ display: "flex", alignItems: 'center', gap: "6px", textDecoration: "underline" }}>
                <Modal title="هدف" />
              </div>
              <div style={{ display: "flex", alignItems: 'center', gap: "6px", textDecoration: "underline" }}>
                <Modal title="اقتصادی" />
              </div>
            </div>
            <div className={styles.footerChart}>
              <div>
                <div className={styles.povNowAnswer}></div>
                <p>موقعیت نسبت به پاسخ مرحله فعلی</p>
              </div>
              <div>
                <div className={styles.povOldAnswer}></div>
                <p>موقعیت نسبت به پاسخ مرحله قبل</p>
              </div>
            </div>
          </div>
          <div className={styles.mainSliderRight}>
            <div className={styles.mainSliderRightBox}>
              <div style={{ background: "#fff", width: "100%", position: "relative" }}>
                <SliderComponent swiper={swiper} setSwiper={setSwiper} />
              </div>
            </div>

            <div className={styles.mainSliderRightBox}>
              <div style={{ background: "#fff", width: "100%", height: "100%" }}>
                <div className={styles.questionContainer}>
                  <div className={styles.questionBox}>
                    <div className={styles.questionBoxRight}>
                      <span>سوال فعلی</span>
                      <p>
                        {predict.questionIndex === 0
                          ? questions[predict.questionIndex].question
                          : questions.find((item: any) => item.question_value === predict.nextPredict)?.question}
                      </p>
                      {questions[predict.questionIndex].type === "number" ? (
                        <div>
                          {/* <InputNumber
                            onChange={handleSelectedChoiceNumber}
                            value={testValue}
                            className={styles.numberInput}
                            min={questions[predict.questionIndex].answer.value_fa[0]}
                            max={questions[predict.questionIndex].answer.value_fa[1]}
                            controls={true}
                          /> */}
                          <Slider
                            min={questions[predict.questionIndex].answer.value_fa[0]}
                            max={questions[predict.questionIndex].answer.value_fa[1]}
                            onChange={handleSelectedChoiceNumber}
                            value={typeof testValue === "number" ? testValue : 0}
                          />
                          <InputNumber
                            min={questions[predict.questionIndex].answer.value_fa[0]}
                            max={questions[predict.questionIndex].answer.value_fa[1]}
                            style={{ margin: "0 16px" }}
                            value={testValue}
                            onChange={handleSelectedChoiceNumber}
                          />
                        </div>
                      ) : questions[predict.questionIndex].type === "dropdown" ? (
                        <div className={styles.questionsAnswers}>
                          {/* <select
                        value={testValue}
                        className={styles.selectAnswerMobile}
                        style={{ width: "100%", borderRadius: "0 !important" }}
                        onChange={handleChange}
                      >
                        {questions
                          .find((item: any) => item.question_value === predict.nextPredict)
                          ?.answer.value_en.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                      </select> */}
                          <Select
                            className={styles.selectAnswer}
                            size="large"
                            labelInValue
                            value={testValue}
                            style={{ width: "100%", borderRadius: "0 !important" }}
                            onChange={handleChange}
                            options={questions.find((item: any) => item.question_value === predict.nextPredict)?.options}
                          />
                        </div>
                      ) : questions[predict.questionIndex].type === "radio" ? (
                        <div className={styles.questionsAnswers}>
                          {questions[predict.questionIndex].answer.value_fa.map((item: any, index: number) => (
                            <div className={styles.buttonChoices} key={index}>
                              <button
                                onClick={() => handleSelectedChoice(index)}
                                className={`${styles.sampleButton} ${
                                  (activeButton === index && styles.activeButton) ||
                                  (predict.lastData[predict.questionIndex]?.answer === item && styles.activeButton)
                                }`}
                              >
                                {item}
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={styles.questionBoxLeft} style={{ marginTop: "-90px" }}>
                      <p>{predict.questionNumber}</p>
                    </div>
                  </div>
                  <div className={styles.questionBoxButtonGroups}>
                    <button onClick={() => handleBack()} className={styles.backButton} disabled={predict.questionIndex === 0}>
                      <AiOutlineArrowRight style={{ fontSize: "14px" }} />
                    </button>
                    <button
                      disabled={
                        Object.keys(predictData).length === 0 || (predict.countAnswer > 1 && predictData[predict.nextPredict]?.length === 0 || loading)
                      }
                      onClick={() => handleSubmit()}
                      className={styles.submitButton}
                    >{loading ? <>
                      صبر کنید ... 
                    </> : <>
                    ثبت پاسخ
                      <AiOutlineArrowLeft style={{ fontSize: "14px" }} />
                    </>} 
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.mainSliderRightBox}>
              <div style={{ width: "100%", height: "100%" }}>
                <div className={styles.potansielChanceContainer}>
                  <div className={styles.potansielChanceBox}>
                    <div className={styles.potansielChanceBoxHeader}>
                      <div>
                        <p style={{ marginBottom: "20px" }}>شانس ویزا</p>
                        <span>
                          %<CountUp end={predict.chance} />
                        </span>
                      </div>
                      <img src="/info.svg" alt="info" />
                    </div>

                    <Progress percent={predict.chance} status="active" />
                    <div className="potansielChanceBoxFooter">
                      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {isNumberIncreasing(
                          prevCounterQuestion[predict.questionNumber - 3]?.chance,
                          prevCounterQuestion[predict.questionNumber - 2]?.chance
                        ) === "more" ? (
                          <img src="/CaretUp.svg" alt="icon" />
                        ) : isNumberIncreasing(
                            prevCounterQuestion[predict.questionNumber - 3]?.chance,
                            prevCounterQuestion[predict.questionNumber - 2]?.chance
                          ) === "low" ? (
                          <img src="/CaretDown.svg" style={{ color: "red", transform: "translate(rotate(-180deg))" }} alt="icon" />
                        ) : (
                          <img src="/CaretEqual.svg" alt="icon" />
                        )}
                        {prevCounterQuestion[predict.questionNumber - 3] ? "%" : ""}
                        {prevCounterQuestion[predict.questionNumber - 3]
                          ? Math.abs(
                              prevCounterQuestion[predict.questionNumber - 3]?.chance -
                                prevCounterQuestion[predict.questionNumber - 2]?.chance
                            )
                          : ""}{" "}
                        {isNumberIncreasing(
                          prevCounterQuestion[predict.questionNumber - 3]?.chance,
                          prevCounterQuestion[predict.questionNumber - 2]?.chance
                        ) === "equal"
                          ? "بدون تغییر"
                          : "تغییر به نسبت سوال قبل"}
                      </p>
                    </div>
                  </div>
                  <div className={styles.potansielChanceBox}>
                    <div className={styles.potansielChanceBoxHeader}>
                      <div>
                        <p style={{ marginBottom: "20px" }}>شناخت ویزارد شما</p>
                        %<CountUp end={predict.potential} />
                      </div>
                      <img src="/info.svg" alt="info" />
                    </div>
                    <Progress percent={predict.potential} status="active" />
                    <div className="potansielChanceBoxFooter">
                      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {isNumberIncreasing(
                          prevCounterQuestion[predict.questionNumber - 3]?.potential,
                          prevCounterQuestion[predict.questionNumber - 2]?.potential
                        ) === "more" ? (
                          <img src="/CaretUp.svg" alt="icon" />
                        ) : isNumberIncreasing(
                            prevCounterQuestion[predict.questionNumber - 3]?.potential,
                            prevCounterQuestion[predict.questionNumber - 2]?.potential
                          ) === "low" ? (
                          <img src="/CaretDown.svg" style={{ color: "red", transform: "translate(rotate(-180deg))" }} alt="icon" />
                        ) : (
                          <img src="/CaretEqual.svg" alt="icon" />
                        )}
                        {prevCounterQuestion[predict.questionNumber - 3] ? "%" : ""}
                        {prevCounterQuestion[predict.questionNumber - 3]
                          ? Math.abs(
                              prevCounterQuestion[predict.questionNumber - 3]?.potential -
                                prevCounterQuestion[predict.questionNumber - 2]?.potential
                            )
                          : ""}{" "}
                        {isNumberIncreasing(
                          prevCounterQuestion[predict.questionNumber - 3]?.potential,
                          prevCounterQuestion[predict.questionNumber - 2]?.potential
                        ) === "equal"
                          ? "بدون تغییر"
                          : "تغییر به نسبت سوال قبل"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.mainSliderRight}>
            <div className={styles.mainSliderRightBox}>
              <div style={{ background: "#fff", width: "100%", position: "relative" }}>
                <SliderComponent swiper={swiper} setSwiper={setSwiper} />
              </div>
            </div>

            <div className={styles.mainSliderRightBox}>
              <div style={{ background: "#fff", width: "100%", height: "100%" }}>
                <div className={styles.questionContainer}>
                  <div className={styles.questionBox}>
                    <div className={styles.questionBoxRight}>
                      <span>سوال فعلی</span>
                      <p>
                        {predict.questionIndex === 0
                          ? questions[predict.questionIndex].question
                          : questions.find((item: any) => item.question_value === predict.nextPredict)?.question}
                      </p>
                      {questions[predict.questionIndex].type === "number" ? (
                        <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "20px" }}>
                          {/* <InputNumber
                            onChange={handleSelectedChoiceNumber}
                            value={testValue}
                            className={styles.numberInput}
                            min={questions[predict.questionIndex].answer.value_fa[0]}
                            max={questions[predict.questionIndex].answer.value_fa[1]}
                            controls={true}
                          /> */}
                          <InputNumber
                            style={{ width: "" }}
                            value={testValue}
                            onChange={handleSelectedChoiceNumber}
                            min={questions[predict.questionIndex].answer.value_fa[0]}
                            max={questions[predict.questionIndex].answer.value_fa[1]}
                          />
                          <Slider
                            style={{ width: "100%" }}
                            min={questions[predict.questionIndex].answer.value_fa[0]}
                            max={questions[predict.questionIndex].answer.value_fa[1]}
                            onChange={handleSelectedChoiceNumber}
                            value={typeof testValue === "number" ? testValue : 0}
                          />
                        </div>
                      ) : questions[predict.questionIndex].type === "dropdown" ? (
                        <div className={styles.questionsAnswers}>
                          {/* <select
                        value={testValue}
                        className={styles.selectAnswerMobile}
                        style={{ width: "100%", borderRadius: "0 !important" }}
                        onChange={handleChange}
                      >
                        {questions
                          .find((item: any) => item.question_value === predict.nextPredict)
                          ?.answer.value_en.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                      </select> */}
                          <Select
                            className={styles.selectAnswer}
                            size="large"
                            labelInValue
                            value={testValue}
                            style={{ width: "100%", borderRadius: "0 !important" }}
                            onChange={handleChange}
                            options={questions.find((item: any) => item.question_value === predict.nextPredict)?.options}
                          />
                        </div>
                      ) : questions[predict.questionIndex].type === "radio" ? (
                        <div className={styles.questionsAnswers}>
                          {questions[predict.questionIndex].answer.value_fa.map((item: any, index: number) => (
                            <div className={styles.buttonChoices} key={index}>
                              <button
                                onClick={() => handleSelectedChoice(index)}
                                className={`${styles.sampleButton} ${
                                  (activeButton === index && styles.activeButton) ||
                                  (predict.lastData[predict.questionIndex]?.answer === item && styles.activeButton)
                                }`}
                              >
                                {item}
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={styles.questionBoxLeft} style={{ marginTop: "-90px" }}>
                      <p>{predict.questionNumber}</p>
                    </div>
                  </div>
                  <div className={styles.questionBoxButtonGroups}>
                    <button onClick={() => handleBack()} className={styles.backButton} disabled={predict.questionIndex === 0}>
                      <AiOutlineArrowRight style={{ fontSize: "14px" }} />
                    </button>
                    <button
                      disabled={
                        Object.keys(predictData).length === 0 || (predict.countAnswer > 1 && predictData[predict.nextPredict]?.length === 0 || loading)
                      }
                      onClick={() => handleSubmit()}
                      className={styles.submitButton}
                    >
                     {loading ? <>
                      صبر کنید ... 
                    </> : <>
                    ثبت پاسخ
                      <AiOutlineArrowLeft style={{ fontSize: "14px" }} />
                    </>}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.mainSliderRightBox}>
              <div style={{ width: "100%", height: "100%" }}>
                <div className={styles.potansielChanceContainer}>
                  <div className={styles.potansielChanceBox}>
                    <div className={styles.potansielChanceBoxHeader}>
                      <div>
                        <p style={{ marginBottom: "20px" }}>شانس ویزا</p>
                        <span>
                          %<CountUp end={predict.chance} />
                        </span>
                      </div>
                      <img src="/info.svg" alt="info" />
                    </div>

                    <Progress percent={predict.chance} status="active" />
                    <div className="potansielChanceBoxFooter">
                      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {isNumberIncreasing(
                          prevCounterQuestion[predict.questionNumber - 3]?.chance,
                          prevCounterQuestion[predict.questionNumber - 2]?.chance
                        ) === "more" ? (
                          <img src="/CaretUp.svg" alt="icon" />
                        ) : isNumberIncreasing(
                            prevCounterQuestion[predict.questionNumber - 3]?.chance,
                            prevCounterQuestion[predict.questionNumber - 2]?.chance
                          ) === "low" ? (
                          <img src="/CaretDown.svg" style={{ color: "red", transform: "translate(rotate(-180deg))" }} alt="icon" />
                        ) : (
                          <img src="/CaretEqual.svg" alt="icon" />
                        )}
                        {prevCounterQuestion[predict.questionNumber - 3] ? "%" : ""}
                        {prevCounterQuestion[predict.questionNumber - 3]
                          ? Math.abs(
                              prevCounterQuestion[predict.questionNumber - 3]?.chance -
                                prevCounterQuestion[predict.questionNumber - 2]?.chance
                            )
                          : ""}{" "}
                        {isNumberIncreasing(
                          prevCounterQuestion[predict.questionNumber - 3]?.chance,
                          prevCounterQuestion[predict.questionNumber - 2]?.chance
                        ) === "equal"
                          ? "بدون تغییر"
                          : "تغییر به نسبت سوال قبل"}
                      </p>
                    </div>
                  </div>
                  <div className={styles.potansielChanceBox}>
                    <div className={styles.potansielChanceBoxHeader}>
                      <div>
                        <p style={{ marginBottom: "20px" }}>شناخت ویزارد شما</p>
                        %<CountUp end={predict.potential} />
                      </div>
                      <img src="/info.svg" alt="info" />
                    </div>
                    <Progress percent={predict.potential} status="active" />
                    <div className="potansielChanceBoxFooter">
                      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {isNumberIncreasing(
                          prevCounterQuestion[predict.questionNumber - 3]?.potential,
                          prevCounterQuestion[predict.questionNumber - 2]?.potential
                        ) === "more" ? (
                          <img src="/CaretUp.svg" alt="icon" />
                        ) : isNumberIncreasing(
                            prevCounterQuestion[predict.questionNumber - 3]?.potential,
                            prevCounterQuestion[predict.questionNumber - 2]?.potential
                          ) === "low" ? (
                          <img src="/CaretDown.svg" style={{ color: "red", transform: "translate(rotate(-180deg))" }} alt="icon" />
                        ) : (
                          <img src="/CaretEqual.svg" alt="icon" />
                        )}
                        {prevCounterQuestion[predict.questionNumber - 3] ? "%" : ""}
                        {prevCounterQuestion[predict.questionNumber - 3]
                          ? Math.abs(
                              prevCounterQuestion[predict.questionNumber - 3]?.potential -
                                prevCounterQuestion[predict.questionNumber - 2]?.potential
                            )
                          : ""}{" "}
                        {isNumberIncreasing(
                          prevCounterQuestion[predict.questionNumber - 3]?.potential,
                          prevCounterQuestion[predict.questionNumber - 2]?.potential
                        ) === "equal"
                          ? "بدون تغییر"
                          : "تغییر به نسبت سوال قبل"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.mainSliderLeft}
            style={{
              background: "#fff",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              padding: "10px",
            }}
          >
            <MyChart questionCounter={questionCounter} prevCounterQuestion={prevCounterQuestion} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: 'center', gap: "6px", textDecoration: "underline" }}>
                <Modal />
                <p>شغلی</p>
              </div>
              <div style={{ display: "flex", alignItems: 'center', gap: "6px", textDecoration: "underline" }}>
                <Modal />
                <p>عاطفی</p>
              </div>
              <div style={{ display: "flex", alignItems: 'center', gap: "6px", textDecoration: "underline" }}>
                <Modal />
                <p>هدف</p>
              </div>
              <div style={{ display: "flex", alignItems: 'center', gap: "6px", textDecoration: "underline" }}>
                <Modal />
                <p>اقتصادی</p>
              </div>
            </div>
            <div className={styles.footerChart}>
              <div>
                <div className={styles.povNowAnswer}></div>
                <p>موقعیت نسبت به پاسخ مرحله فعلی</p>
              </div>
              <div>
                <div className={styles.povOldAnswer}></div>
                <p>موقعیت نسبت به پاسخ مرحله قبل</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
