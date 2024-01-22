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
  setGroupedXaiExpanded,
  setNextPredictBackup,
  setNextPredictData,
  setPotentialData,
} from "@/store/features/predictSlice";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import CallApi from "@/utils/CallApi";
import { use, useEffect, useState } from "react";
import CountUp from "react-countup";
import { setToFinished } from "@/store/features/sliderSlice";
import Modal from "../utils/modal/Modal";
import Typewriter from "../utils/TypeWriter";
import ChancePotentialModal from "../utils/modal/ChancePotentialModal";
import InfoAlert from "../utils/alerts/InfoAlert";
import Footer from "../Footer";
import Navbar from "../Navbar";
import ApexChart from "@/utils/ApexChart";

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
  const [loading, setLoading] = useState(false);
  const [finished, setToFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chanceHistory, setChanceHistory] = useState([])

  let data = {
    series: [
      {
        name: "تغییرات پاسخ فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 2
            ? chanceHistory[questionCounter - 2].chartData
            : [0, 0, 0, 0, 0],
      },
      {
        name: "تغییرات پاسخ قبلی نسبت فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 3
            ? chanceHistory[questionCounter - 3].chartData
            : [0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 370,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        x: {
          // format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

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

    if (lastKey === predict.nextPredict) {
      if (predict.questionIndex === 0) {
        const valueEn = questions[predict.questionIndex]?.answer?.value_en;
        setTestValue(valueEn[index]);
        if (valueEn) {
          setPredictData({
            ...predictData,
            sex: valueEn[index],
          });
          setPrevCounterQuestion((prev) => {
            const indexx = prevCounterQuestion?.findIndex((item) => item.type === lastKey);
            if (indexx !== -1) {
              prev[indexx] = {
                ...prev[indexx],
                answer: valueEn[index],
                activeButton: index,
              };
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
              prev[indexx] = {
                ...prev[indexx],
                answer: valueEn[index],
                activeButton: index,
              };
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
      if (questionValue && valueEn) {
        setPredictData({
          ...predictData,
          [questionValue]: valueEn[index],
        });
        setPrevCounterQuestion((prev) => {
          const indexx = prevCounterQuestion?.findIndex((item) => item.type === lastKey);
          if (indexx !== -1) {
            prev[indexx] = {
              ...prev[indexx],
              answer: valueEn[index],
              activeButton: index,
            };
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
    if (value.default === 0 || value.default) {
      setTestValue(value.default);
    }

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
  console.log(prevCounterQuestion);
  const handleSubmit = async () => {
    console.log(editMode);
    console.log(editChanges);
    if (editMode && editChanges) {
      setEditMode(false);
      setEditChanges(false);
      setQuestionCounter((prev) => prev + 1);
      const newState: any = [];
      let keep = false;

      for (let i = editData.length - 1; i >= 0; i--) {
        const key = editData[i];
        if (key === editKeyChanges) {
          keep = true;
        }
        if (keep) {
          console.log(key);
          if (!newState.includes(key)) {
            newState.unshift(key);
          }
        }
      }

      const filteredData: any = {};
      const filteredDataTest: any = [];

      for (const key of newState) {
        if (key in predictData) {
          filteredData[key] = predictData[key];
        }
      }
      setPredictData("");
      setPredictData(filteredData);

      // console.log(filteredDataTest)
      // console.log(filteredDataTest)

      await CallApi.post("/predict", filteredData)
        .then(async (resp) => {
          dispatch(setChanceData({ chance: resp.data.result }));
          for (const key of newState) {
            const matchingObject = prevCounterQuestion.find((obj) => obj.type === key);
            if (matchingObject) {
              if (matchingObject.countAnswer === questionCounter) {
                matchingObject.chance = Math.round(Number(resp.data.result) * 100);
              }
              filteredDataTest.push(matchingObject);
            }
          }
          dispatch(setNextPredictData({ nextVariable: resp.data.next_variable }));
          dispatch(setNextPredictBackup({ nextVariable: resp.data.next_variable }));
          setPredictData({ ...filteredData, [resp.data.next_variable]: "" });
          setPrevCounterQuestion(filteredDataTest);

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
      console.log(prevCounterQuestion[questionCounter - 1]);
      console.log(predict.nextPredictBackup);
      if (predict.countAnswer === predict.questionNumber + 1) {
        dispatch(
          setNextPredictData({
            nextVariable: predict.nextPredictBackup,
          })
        );
      } else {
        dispatch(
          setNextPredictData({
            nextVariable:
              questionCounter > 1
                ? prevCounterQuestion[questionCounter].type
                : prevCounterQuestion[1].type,
          })
        );
      }
      setTestValue(
        questionCounter > 1
          ? prevCounterQuestion[questionCounter].answer
          : prevCounterQuestion[1].answer
      );
      dispatch(addCountQuestion());
      dispatch(addCounterQuestionIndex({ change: true }));
      console.log(prevCounterQuestion[questionCounter - 1].chance);
      dispatch(
        setChanceData({
          chance: prevCounterQuestion[questionCounter - 1].chance,
        })
      );
      dispatch(setPotentialData(prevCounterQuestion[questionCounter - 1].potential));
      setQuestionCounter((prev) => prev + 1);
    } else {
      setQuestionCounter((prev) => prev + 1);
      setEditMode(false);
      if (predict.countAnswer === predict.questionNumber) {
        await CallApi.post("/predict", predictData)
          .then(async (respo) => {
            if (!respo.data.next_variable) {
              setToFinished(true);
            }
            console.log("haa");
            dispatch(setChanceData({ chance: respo.data.result }));
            dispatch(setNextPredictData({ nextVariable: respo.data.next_variable }));
            dispatch(setNextPredictBackup({ nextVariable: respo.data.next_variable }));
            setPredictData({ ...predictData, [respo.data.next_variable]: "" });
            await CallApi.post("/grouped_xai", predictData).then(async (resp) => {
              dispatch(setGroupedXai({ data: resp.data }));
              await CallApi.post("/potential", predictData)
                .then(async (response) => {
                  dispatch(setPotentialData(response.data.result));
                  if (predict.countAnswer === 1) {
                    dispatch(addCounterQuestionIndex({ payload: "" }));
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
                  // await CallApi.post("/grouped_xai_expanded", predictData).then((respon) => {
                  //   dispatch(setGroupedXaiExpanded(respon.data.grouped_xai_expanded));
                  // });
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
        console.log("chance2", prevCounterQuestion[questionCounter - 1].chance);
        if (predict.questionNumber === prevCounterQuestion.length) {
          dispatch(setNextPredictData({ nextVariable: predict.nextPredictBackup }));
          dispatch(addCountQuestion());
          dispatch(addCounterQuestionIndex({ change: true }));
          setTestValue("");
          setEditMode(false);
          setEditChanges(false);
          dispatch(
            setChanceData({
              chance: prevCounterQuestion[questionCounter - 1].chance,
            })
          );
        } else {
          setTestValue(prevCounterQuestion[predict.questionNumber].answer);
          dispatch(
            setNextPredictData({
              nextVariable: prevCounterQuestion[predict.questionNumber].type,
            })
          );
          dispatch(
            setChanceData({
              chance: prevCounterQuestion[questionCounter - 1].chance,
            })
          );
          dispatch(addCountQuestion());
          setQuestionCounter((prev) => prev + 1);
          dispatch(addCounterQuestionIndex({ change: true }));
        }
      }
    }
  };

  function isNumberIncreasing(previousNumber: any, currentNumber: any) {
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
    dispatch(
      setNextPredictData({
        nextVariable: prevCounterQuestion[questionCounter - 2].type,
      })
    );
    console.log(prevCounterQuestion[questionCounter - 2]);
    dispatch(
      setChanceData({
        chance: prevCounterQuestion[questionCounter - 3 < 0 ? 0 : questionCounter - 3].chance,
      })
    );
    dispatch(
      setPotentialData(
        prevCounterQuestion[questionCounter - 3 < 0 ? 0 : questionCounter - 3].potential
      )
    );
    dispatch(minusCountQuestion());
    dispatch(addCounterQuestionIndex({ change: true }));

    if (questionCounter > 1) {
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

    // if (questions[predict.questionIndex].type === "number") {
    //   handleSelectedChoiceNumber({ default: questions[predict.questionIndex].answer.value_fa[0] })
    // }
  }, [predict.countAnswer]);

  let marks = {};
  const handleMarks = ({ min, max, stepNumber, hardCode }) => {
    if (hardCode === "age") {
      marks = {
        18: min,
        25: 25,
        30: 30,
        35: 35,
        40: 40,
        45: 45,
        50: max,
      };
    } else {
      const step = stepNumber;
      for (let i = min; i <= max; i += step) {
        marks[i] = i;
      }
    }

    return marks;
  };

  console.log(prevCounterQuestion);
  console.log("questionCounter", questionCounter);
  console.log("countAnswer", predict.countAnswer);
  console.log("questionNumber", predict.questionNumber);
  const [isMobile, setIsMobile] = useState(false);

  console.log(800 - (800 * (50 / 100)))
  document.documentElement.style.setProperty("--progress", String(800 - (800 * (50 / 100))));

  return (
    <div className={styles.mainSliderPage}>
      <style>{`--progress: ${800 - (800 * (50 / 100))}`}</style>
      <Navbar />

      <div className={styles.mainSlider}>
        <div className={styles.mainSliderRight}>
          <div className={styles.questionBox}>
            <div className={styles.questionText}>
              <p>{questionCounter}</p>
              <p>{questions[currentQuestionIndex].question}</p>
            </div>
            <div className={styles.answerChioces}>
              {questions[currentQuestionIndex].type === "radio" ? (
                questions[currentQuestionIndex].answer.value_fa.map((item, index) => (
                  <button
                    className={activeButton === index && styles.activeButton}
                    key={index}
                    onClick={() => {
                      handleChange(index);
                      setActiveButton(index);
                    }}
                  >
                    {item}
                  </button>
                ))
              ) : questions[currentQuestionIndex].type === "dropdown" ? (
                <select onChange={(event) => handleChange(event.target.value)}>
                  {questions[currentQuestionIndex].answer.value_fa.map((item, index) => (
                    <option key={index} value={index}>
                      {item}
                    </option>
                  ))}
                </select>
              ) : questions[currentQuestionIndex].type === "number" ? (
                <div className={styles.questionNumber}>
                  <button onClick={() => setAnswer((prevValue) => Number(prevValue + 1))}>+</button>
                  <input
                    type="number"
                    min={questions[currentQuestionIndex].answer.value_fa[0]}
                    max={questions[currentQuestionIndex].answer.value_fa[1]}
                    value={answer}
                    defaultValue={questions[currentQuestionIndex].answer.value_fa[0]}
                    onChange={(event) => handleChange(event.target.value, "number")}
                  />
                  <button onClick={() => setAnswer((prevValue) => Number(prevValue - 1))}>-</button>
                </div>
              ) : questions[currentQuestionIndex].type === "radio_multi" ? (
                questions[currentQuestionIndex].answer.value_fa.map((item, index) => (
                  <button
                    className={
                      answer !== null &&
                      answer.includes(questions[currentQuestionIndex].answer.value_en[index]) &&
                      styles.activeButton
                    }
                    key={index}
                    onClick={() => {
                      handleChange(
                        questions[currentQuestionIndex].answer.value_en[index],
                        "radio_multi"
                      );
                      setActiveButton(index);
                    }}
                  >
                    {item}
                  </button>
                ))
              ) : (
                ""
              )}
            </div>
            <div className={styles.buttonGroups}>
              <button>
                ثبت پاسخ
                <img src="forward-arrow.svg" alt="arrow" />
              </button>

              <button disabled={true}>اطلاعات بیشتر</button>
            </div>
          </div>
          <div className={styles.chancePotentialBox}>
            <div className={styles.chanceBox}>
              <p>شانس ویزا</p>
              <div className={styles.progressBar}>
                <svg
                  fill="none"
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  className={styles.progressFull}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M100 200L0 200L0 0L200 0L200 200L100 200" stroke-width="40" />
                </svg>
                <svg
                  fill="none"
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  className={styles.progress}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M100 200L0 200L0 0L200 0L200 200L100 200" stroke-width="40" />
                </svg>
                <div className={styles.chanceNumber}>
                  <img src="/CaretUp.svg" alt="icon" />
                  <p><span>%</span> 84</p>
                  {/* {isNumberIncreasing(
                    chanceHistory[chanceHistory.length - 2]?.chance,
                    chanceHistory[chanceHistory.length - 1]?.chance
                  ) === "more" ? (
                    <img src="/CaretUp.svg" alt="icon" />
                  ) : isNumberIncreasing(
                    chanceHistory[chanceHistory.length - 2]?.chance,
                    chanceHistory[chanceHistory.length - 1]?.chance
                  ) === "low" ? (
                    <img
                      src="/CaretDown.svg"
                      style={{
                        color: "red",
                        transform: "translate(rotate(-180deg))",
                      }}
                      alt="icon"
                    />
                  ) : (
                    <img src="/CaretEqual.svg" alt="icon" />
                  )} */}
                </div>
              </div>
            </div>
            <div className={styles.potentialBox}>
              <p>شناخت ویزارد از شما</p>
              <div className={styles.progressBar}>
                <svg
                  fill="none"
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  className={styles.progressFull}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M100 200L0 200L0 0L200 0L200 200L100 200" stroke-width="40" />
                </svg>
                <svg
                  fill="none"
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  className={styles.progress}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M100 200L0 200L0 0L200 0L200 200L100 200" stroke-width="40" />
                </svg>
                <div className={styles.potentialNumber}>
                  <div className={styles.footerVisHead}>
                    <img src="vizard-head.svg" alt="vizard-head" />
                  </div>
                  <div className={styles.potentialNumberIcon}>
                    <img src="/CaretUp.svg" alt="icon" />
                    <p><span>%</span> 84</p>
                  </div>
                  {/* {isNumberIncreasing(
                    chanceHistory[chanceHistory.length - 2]?.chance,
                    chanceHistory[chanceHistory.length - 1]?.chance
                  ) === "more" ? (
                    <img src="/CaretUp.svg" alt="icon" />
                  ) : isNumberIncreasing(
                    chanceHistory[chanceHistory.length - 2]?.chance,
                    chanceHistory[chanceHistory.length - 1]?.chance
                  ) === "low" ? (
                    <img
                      src="/CaretDown.svg"
                      style={{
                        color: "red",
                        transform: "translate(rotate(-180deg))",
                      }}
                      alt="icon"
                    />
                  ) : (
                    <img src="/CaretEqual.svg" alt="icon" />
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainSliderLeft}>
          <InfoAlert />

          <div className={styles.mainCharts}>
            <div className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}
              <ApexChart options={data.options} series={data.series} type="area" height={250} />
            </div>
          </div>

          <div className={styles.chartsIconsBox}>
            <div className={styles.chartIcon}>
              <img src="chart/LineChartIcon.svg" alt="chart-icon" />
              <p>نام جدول</p>
            </div>
            <div className={styles.chartIcon}>
              <img src="chart/NegativeBarChart Icon.svg" alt="chart-icon" />
              <p>نام جدول</p>
            </div>
            <div className={styles.chartIcon}>
              <img src="chart/RadarChartIcon.svg" alt="chart-icon" />
              <p>نام جدول</p>
            </div>
            <div className={styles.chartIcon}>
              <img src="chart/BarChartIcon.svg" alt="chart-icon" />
              <p>نام جدول</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
