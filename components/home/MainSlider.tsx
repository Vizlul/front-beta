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
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { setToFinished } from "@/store/features/sliderSlice";
import Modal from "../utils/modal/Modal";
import Typewriter from "../utils/TypeWriter";
import ChancePotentialModal from "../utils/modal/ChancePotentialModal";

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
      console.log("haa");
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

  return (
    // <div className={styles.mainSlider}>
    //   {window.innerWidth < 768 ? (
    //     <>
    //       <div
    //         className={styles.mainSliderLeft}
    //         style={{
    //           background: "#fff",
    //           height: "100%",
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           position: "relative",
    //           padding: "10px",
    //         }}
    //       >
    //         <MyChart questionCounter={questionCounter} prevCounterQuestion={prevCounterQuestion} />
    //         <div
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //             gap: "10px",
    //           }}
    //         >
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               gap: "6px",
    //               textDecoration: "underline",
    //             }}
    //           >
    //             <Modal title="شغلی" title_en="career" />
    //           </div>
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               gap: "6px",
    //               textDecoration: "underline",
    //             }}
    //           >
    //             <Modal title="عاطفی" title_en="emotional" />
    //           </div>
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               gap: "6px",
    //               textDecoration: "underline",
    //             }}
    //           >
    //             <Modal title="هدف" title_en="purpose" />
    //           </div>
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               gap: "6px",
    //               textDecoration: "underline",
    //             }}
    //           >
    //             <Modal title="اقتصادی" title_en="financial" />
    //           </div>
    //         </div>
    //         <div className={styles.footerChart}>
    //           <div>
    //             <div className={styles.povNowAnswer}></div>
    //             <p>موقعیت نسبت به پاسخ مرحله فعلی</p>
    //           </div>
    //           <div>
    //             <div className={styles.povOldAnswer}></div>
    //             <p>موقعیت نسبت به پاسخ مرحله قبل</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className={styles.mainSliderRight}>
    //         <div className={styles.mainSliderRightBox}>
    //           <div
    //             style={{
    //               background: "#fff",
    //               width: "100%",
    //               position: "relative",
    //             }}
    //           >
    //             <SliderComponent swiper={swiper} setSwiper={setSwiper} />
    //           </div>
    //         </div>

    //         <div className={styles.mainSliderRightBox}>
    //           <div style={{ background: "#fff", width: "100%", height: "100%" }}>
    //             <div className={styles.questionContainer}>
    //               <div className={styles.questionBox}>
    //                 <div className={styles.questionBoxRight}>
    //                   <span>سوال فعلی</span>
    //                   <p>
    //                     {predict.questionIndex === 0
    //                       ? questions[predict.questionIndex].question
    //                       : questions.find(
    //                           (item: any) => item.question_value === predict.nextPredict
    //                         )?.question}
    //                   </p>
    //                   {questions[predict.questionIndex].type === "number" ? (
    //                     <div
    //                       style={{
    //                         display: "flex",
    //                         alignItems: "center",
    //                         width: "100%",
    //                         gap: "20px",
    //                       }}
    //                     >
    //                       {/* <InputNumber
    //                         onChange={handleSelectedChoiceNumber}
    //                         value={testValue}
    //                         className={styles.numberInput}
    //                         min={questions[predict.questionIndex].answer.value_fa[0]}
    //                         max={questions[predict.questionIndex].answer.value_fa[1]}
    //                         controls={true}
    //                       /> */}
    //                       <Slider
    //                         style={{ width: "75%", color: "red" }}
    //                         min={questions[predict.questionIndex].answer.value_fa[0]}
    //                         max={questions[predict.questionIndex].answer.value_fa[1]}
    //                         onChange={handleSelectedChoiceNumber}
    //                         value={typeof testValue === "number" ? testValue : 0}
    //                         marks={handleMarks({
    //                           min: questions[predict.questionIndex].answer.value_fa[0],
    //                           max: questions[predict.questionIndex].answer.value_fa[1],
    //                           hardCode:
    //                             questions[predict.questionIndex].question_value === "date_of_birth"
    //                               ? "age"
    //                               : "",
    //                         })}
    //                         styles={{
    //                           track: {
    //                             background: "transparent",
    //                           },
    //                           tracks: {
    //                             background: "red",
    //                           },
    //                         }}
    //                       />
    //                       <InputNumber
    //                         min={questions[predict.questionIndex].answer.value_fa[0]}
    //                         max={questions[predict.questionIndex].answer.value_fa[1]}
    //                         style={{
    //                           width: "25%",
    //                           borderRadius: "0",
    //                           borderColor: "#d9d9d9 !important",
    //                         }}
    //                         value={testValue}
    //                         onChange={handleSelectedChoiceNumber}
    //                       />
    //                     </div>
    //                   ) : questions[predict.questionIndex].type === "dropdown" ? (
    //                     <div className={styles.questionsAnswers}>
    //                       {/* <select
    //                     value={testValue}
    //                     className={styles.selectAnswerMobile}
    //                     style={{ width: "100%", borderRadius: "0 !important" }}
    //                     onChange={handleChange}
    //                   >
    //                     {questions
    //                       .find((item: any) => item.question_value === predict.nextPredict)
    //                       ?.answer.value_en.map((item, index) => (
    //                         <option key={index}>{item}</option>
    //                       ))}
    //                   </select> */}
    //                       <Select
    //                         className={styles.selectAnswer}
    //                         size="large"
    //                         labelInValue
    //                         value={testValue}
    //                         style={{
    //                           width: "100%",
    //                           borderRadius: "0 !important",
    //                         }}
    //                         onChange={handleChange}
    //                         options={
    //                           questions.find(
    //                             (item: any) => item.question_value === predict.nextPredict
    //                           )?.options
    //                         }
    //                       />
    //                     </div>
    //                   ) : questions[predict.questionIndex].type === "radio" ? (
    //                     <div className={styles.questionsAnswers}>
    //                       {questions[predict.questionIndex].answer.value_fa.map(
    //                         (item: any, index: number) => (
    //                           <div className={styles.buttonChoices} key={index}>
    //                             <button
    //                               onClick={() => handleSelectedChoice(index)}
    //                               className={`${styles.sampleButton} ${
    //                                 (activeButton === index && styles.activeButton) ||
    //                                 (predict.lastData[predict.questionIndex]?.answer === item &&
    //                                   styles.activeButton)
    //                               }`}
    //                             >
    //                               {item}
    //                             </button>
    //                           </div>
    //                         )
    //                       )}
    //                     </div>
    //                   ) : (
    //                     ""
    //                   )}
    //                 </div>
    //                 <div className={styles.questionBoxLeft} style={{ marginTop: "-90px" }}>
    //                   <p>{predict.questionNumber}</p>
    //                 </div>
    //               </div>
    //               <div className={styles.questionBoxButtonGroups}>
    //                 <button
    //                   onClick={() => handleBack()}
    //                   className={styles.backButton}
    //                   disabled={predict.questionIndex === 0 || finished}
    //                 >
    //                   <AiOutlineArrowRight style={{ fontSize: "14px" }} />
    //                 </button>
    //                 <button
    //                   disabled={
    //                     Object.keys(predictData).length === 0 ||
    //                     (predict.countAnswer > 1 &&
    //                       predictData[predict.nextPredict]?.length === 0) ||
    //                     loading
    //                   }
    //                   onClick={() => handleSubmit()}
    //                   className={styles.submitButton}
    //                 >
    //                   {loading ? (
    //                     <>صبر کنید ...</>
    //                   ) : finished ? (
    //                     <p onClick={() => dispatch(setToFinished())}>پایان</p>
    //                   ) : (
    //                     <>
    //                       ثبت پاسخ
    //                       <AiOutlineArrowLeft style={{ fontSize: "14px" }} />
    //                     </>
    //                   )}
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className={styles.mainSliderRightBox}>
    //           <div style={{ width: "100%", height: "100%" }}>
    //             <div className={styles.potansielChanceContainer}>
    //               <div className={styles.potansielChanceBox}>
    //                 <div className={styles.potansielChanceBoxHeader}>
    //                   <div>
    //                     <p style={{ marginBottom: "20px" }}>شانس ویزا</p>
    //                     {predict.countAnswer > 0 ? (
    //                       <>
    //                         %<CountUp end={predict.chance} />
    //                       </>
    //                     ) : (
    //                       <div
    //                         style={{
    //                           display: "flex",
    //                           flexDirection: "column",
    //                           gap: "6px",
    //                         }}
    //                       >
    //                         <span
    //                           style={{
    //                             WebkitFilter: "4px",
    //                             filter: "blur(4px)",
    //                           }}
    //                         >
    //                           %<CountUp end={predict.chance} />
    //                         </span>
    //                         <span
    //                           style={{
    //                             display: "flex",
    //                             alignItems: "center",
    //                             gap: "4px",
    //                             color: "rgba(0, 0, 0, 0.45)",
    //                           }}
    //                         >
    //                           نیاز به پاسخ‌های بیشتر{" "}
    //                           <ChancePotentialModal
    //                             title="more_answer"
    //                             description="تعداد پاسخ‌های شما برای تخمین شانس ویزا کافی نیست، پیشنهاد می‌کنیم به سوالات بیشتری پاسخ دهید."
    //                           />
    //                         </span>
    //                       </div>
    //                     )}
    //                   </div>
    //                   <ChancePotentialModal
    //                     title="chance"
    //                     description="در طول فرآیند پاسخگویی به سوالات، شانس ویزا شدن پرونده شما در هر
    //         مرحله، توسط ویزارد و با توجه به اطلاعاتی که تا همان مرحله در اختیارش
    //         قرار داده‌اید مشخص خواهد شد"
    //                   />
    //                 </div>

    //                 <Progress percent={predict.chance} status="active" strokeColor="#00554e" />
    //                 <div className="potansielChanceBoxFooter">
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       alignItems: "center",
    //                       gap: "10px",
    //                     }}
    //                   >
    //                     {isNumberIncreasing(
    //                       prevCounterQuestion[predict.questionNumber - 3]?.chance,
    //                       prevCounterQuestion[predict.questionNumber - 2]?.chance
    //                     ) === "more" ? (
    //                       <img src="/CaretUp.svg" alt="icon" />
    //                     ) : isNumberIncreasing(
    //                         prevCounterQuestion[predict.questionNumber - 3]?.chance,
    //                         prevCounterQuestion[predict.questionNumber - 2]?.chance
    //                       ) === "low" ? (
    //                       <img
    //                         src="/CaretDown.svg"
    //                         style={{
    //                           color: "red",
    //                           transform: "translate(rotate(-180deg))",
    //                         }}
    //                         alt="icon"
    //                       />
    //                     ) : (
    //                       <img src="/CaretEqual.svg" alt="icon" />
    //                     )}
    //                     {prevCounterQuestion[predict.questionNumber - 3] ? "%" : ""}
    //                     {prevCounterQuestion[predict.questionNumber - 3]
    //                       ? Math.abs(
    //                           prevCounterQuestion[predict.questionNumber - 3]?.chance -
    //                             prevCounterQuestion[predict.questionNumber - 2]?.chance
    //                         )
    //                       : ""}{" "}
    //                     {isNumberIncreasing(
    //                       prevCounterQuestion[predict.questionNumber - 2]?.chance,
    //                       prevCounterQuestion[predict.questionNumber - 1]?.chance
    //                     ) === "equal"
    //                       ? "بدون تغییر"
    //                       : "تغییر به نسبت سوال قبل"}
    //                   </p>
    //                 </div>
    //               </div>
    //               <div className={styles.potansielChanceBox}>
    //                 <div className={styles.potansielChanceBoxHeader}>
    //                   <div>
    //                     <p style={{ marginBottom: "20px" }}>شناخت ویزارد شما</p>
    //                     %<CountUp end={predict.potential} />
    //                   </div>
    //                   <ChancePotentialModal
    //                     title="potential"
    //                     description="هرچه شناخت ویزارد از شما بیشتر باشد، پاسخی که می‌دهد به واقعیت نزدیک
    //         خواهد بود. پس لطفا به تا پایان گفتگو، همراهش بمانید و با دقت به
    //         سوالاتش پاسخ دهید."
    //                   />
    //                 </div>
    //                 <Progress percent={predict.potential} status="active" strokeColor="#00ac87" />
    //                 <div className="potansielChanceBoxFooter">
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       alignItems: "center",
    //                       gap: "10px",
    //                     }}
    //                   >
    //                     {isNumberIncreasing(
    //                       prevCounterQuestion[predict.questionNumber - 3]?.potential,
    //                       prevCounterQuestion[predict.questionNumber - 2]?.potential
    //                     ) === "more" ? (
    //                       <img src="/CaretUp.svg" alt="icon" />
    //                     ) : isNumberIncreasing(
    //                         prevCounterQuestion[predict.questionNumber - 3]?.potential,
    //                         prevCounterQuestion[predict.questionNumber - 2]?.potential
    //                       ) === "low" ? (
    //                       <img
    //                         src="/CaretDown.svg"
    //                         style={{
    //                           color: "red",
    //                           transform: "translate(rotate(-180deg))",
    //                         }}
    //                         alt="icon"
    //                       />
    //                     ) : (
    //                       <img src="/CaretEqual.svg" alt="icon" />
    //                     )}
    //                     {prevCounterQuestion[predict.questionNumber - 3] ? "%" : ""}
    //                     {prevCounterQuestion[predict.questionNumber - 3]
    //                       ? Math.abs(
    //                           prevCounterQuestion[predict.questionNumber - 3]?.potential -
    //                             prevCounterQuestion[predict.questionNumber - 2]?.potential
    //                         )
    //                       : ""}{" "}
    //                     {isNumberIncreasing(
    //                       prevCounterQuestion[predict.questionNumber - 3]?.potential,
    //                       prevCounterQuestion[predict.questionNumber - 2]?.potential
    //                     ) === "equal"
    //                       ? "بدون تغییر"
    //                       : "تغییر به نسبت سوال قبل"}
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   ) : (
    //     <>
    //       <div className={styles.mainSliderRight}>
    //         <div className={styles.mainSliderRightBox}>
    //           <div
    //             style={{
    //               background: "#fff",
    //               width: "100%",
    //               position: "relative",
    //             }}
    //           >
    //             <SliderComponent swiper={swiper} setSwiper={setSwiper} />
    //           </div>
    //         </div>

    //         <div className={styles.mainSliderRightBox}>
    //           <div style={{ background: "#fff", width: "100%", height: "100%" }}>
    //             <div className={styles.questionContainer}>
    //               <div className={styles.questionBox}>
    //                 <div className={styles.questionBoxRight}>
    //                   <span>سوال فعلی</span>
    //                   <p>
    //                     {predict.questionIndex === 0
    //                       ? questions[predict.questionIndex].question
    //                       : questions.find(
    //                           (item: any) => item.question_value === predict.nextPredict
    //                         )?.question}
    //                   </p>
    //                   {questions[predict.questionIndex]?.type === "number" ? (
    //                     <div
    //                       style={{
    //                         display: "flex",
    //                         alignItems: "center",
    //                         width: "100%",
    //                         gap: "20px",
    //                       }}
    //                     >
    //                       {/* <InputNumber
    //                         onChange={handleSelectedChoiceNumber}
    //                         value={testValue}
    //                         className={styles.numberInput}
    //                         min={questions[predict.questionIndex].answer.value_fa[0]}
    //                         max={questions[predict.questionIndex].answer.value_fa[1]}
    //                         controls={true}
    //                       /> */}
    //                       <InputNumber
    //                         style={{ width: "" }}
    //                         value={testValue}
    //                         onChange={handleSelectedChoiceNumber}
    //                         min={questions[predict.questionIndex].answer.value_fa[0]}
    //                         max={questions[predict.questionIndex].answer.value_fa[1]}
    //                       />
    //                       <Slider
    //                         style={{ width: "100%" }}
    //                         min={questions[predict.questionIndex].answer.value_fa[0]}
    //                         max={questions[predict.questionIndex].answer.value_fa[1]}
    //                         onChange={handleSelectedChoiceNumber}
    //                         value={typeof testValue === "number" ? testValue : 0}
    //                         marks={handleMarks({
    //                           min: questions[predict.questionIndex].answer.value_fa[0],
    //                           max: questions[predict.questionIndex].answer.value_fa[1],
    //                           stepNumber: questions[predict.questionIndex].step,
    //                           hardCode:
    //                             questions[predict.questionIndex].question_value === "date_of_birth"
    //                               ? "age"
    //                               : "",
    //                         })}
    //                       />
    //                     </div>
    //                   ) : questions[predict.questionIndex].type === "dropdown" ? (
    //                     <div className={styles.questionsAnswers}>
    //                       <Select
    //                         className={styles.selectAnswer}
    //                         size="large"
    //                         labelInValue
    //                         value={testValue}
    //                         style={{
    //                           width: "100%",
    //                           borderRadius: "0 !important",
    //                         }}
    //                         onChange={handleChange}
    //                         options={
    //                           questions.find(
    //                             (item: any) => item.question_value === predict.nextPredict
    //                           )?.options
    //                         }
    //                       />
    //                     </div>
    //                   ) : questions[predict.questionIndex].type === "radio" ? (
    //                     <div className={styles.questionsAnswers}>
    //                       {questions[predict.questionIndex].answer.value_fa.map(
    //                         (item: any, index: number) => (
    //                           <div className={styles.buttonChoices} key={index}>
    //                             <button
    //                               onClick={() => handleSelectedChoice(index)}
    //                               className={`${styles.sampleButton} ${
    //                                 (activeButton === index && styles.activeButton) ||
    //                                 (predict.lastData[predict.questionIndex]?.answer === item &&
    //                                   styles.activeButton)
    //                               }`}
    //                             >
    //                               {item}
    //                             </button>
    //                           </div>
    //                         )
    //                       )}
    //                     </div>
    //                   ) : (
    //                     ""
    //                   )}
    //                 </div>
    //                 <div className={styles.questionBoxLeft} style={{ marginTop: "-90px" }}>
    //                   <p>{predict.questionNumber}</p>
    //                 </div>
    //               </div>
    //               <div className={styles.questionBoxButtonGroups}>
    //                 <button
    //                   onClick={() => handleBack()}
    //                   className={styles.backButton}
    //                   disabled={predict.questionIndex === 0 || finished}
    //                 >
    //                   <AiOutlineArrowRight style={{ fontSize: "14px" }} />
    //                 </button>
    //                 <button
    //                   disabled={
    //                     Object.keys(predictData).length === 0 ||
    //                     (predict.countAnswer > 1 &&
    //                       predictData[predict.nextPredict]?.length === 0) ||
    //                     loading
    //                   }
    //                   onClick={() => handleSubmit()}
    //                   className={styles.submitButton}
    //                 >
    //                   {loading ? (
    //                     <>صبر کنید ...</>
    //                   ) : finished ? (
    //                     <p onClick={() => dispatch(setToFinished())}>پایان</p>
    //                   ) : (
    //                     <>
    //                       ثبت پاسخ
    //                       <AiOutlineArrowLeft style={{ fontSize: "14px" }} />
    //                     </>
    //                   )}
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className={styles.mainSliderRightBox}>
    //           <div style={{ width: "100%", height: "100%" }}>
    //             <div className={styles.potansielChanceContainer}>
    //               <div className={styles.potansielChanceBox}>
    //                 <div className={styles.potansielChanceBoxHeader}>
    //                   <div>
    //                     <p style={{ marginBottom: "20px" }}>شانس ویزا</p>
    //                     {predict.countAnswer > 0 ? (
    //                       <>
    //                         %<CountUp end={predict.chance} />
    //                       </>
    //                     ) : (
    //                       <div
    //                         style={{
    //                           display: "flex",
    //                           flexDirection: "column",
    //                           gap: "6px",
    //                         }}
    //                       >
    //                         {/* <span
    //                           style={{
    //                             WebkitFilter: "4px",
    //                             filter: "blur(4px)",
    //                           }}
    //                         >
    //                           %<CountUp end={predict.chance} />
    //                         </span> */}
    //                         <span
    //                           style={{
    //                             display: "flex",
    //                             alignItems: "center",
    //                             gap: "4px",
    //                             color: "rgba(0, 0, 0, 0.45)",
    //                           }}
    //                         >
    //                           نیاز به پاسخ‌های بیشتر{" "}
    //                           <ChancePotentialModal
    //                             title="more_answer"
    //                             description="تعداد پاسخ‌های شما برای تخمین شانس ویزا کافی نیست، پیشنهاد می‌کنیم به سوالات بیشتری پاسخ دهید."
    //                           />
    //                         </span>
    //                       </div>
    //                     )}
    //                   </div>
    //                   <ChancePotentialModal
    //                     title="chance"
    //                     description="در طول فرآیند پاسخگویی به سوالات، شانس ویزا شدن پرونده شما در هر
    //         مرحله، توسط ویزارد و با توجه به اطلاعاتی که تا همان مرحله در اختیارش
    //         قرار داده‌اید مشخص خواهد شد"
    //                   />
    //                 </div>

    //                 <Progress percent={predict.chance} status="active" strokeColor="#00554e" />
    //                 <div className="potansielChanceBoxFooter">
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       alignItems: "center",
    //                       gap: "10px",
    //                     }}
    //                   >
    //                     {isNumberIncreasing(
    //                       prevCounterQuestion[predict.questionNumber - 3]?.chance,
    //                       prevCounterQuestion[predict.questionNumber - 2]?.chance
    //                     ) === "more" ? (
    //                       <img src="/CaretUp.svg" alt="icon" />
    //                     ) : isNumberIncreasing(
    //                         prevCounterQuestion[predict.questionNumber - 3]?.chance,
    //                         prevCounterQuestion[predict.questionNumber - 2]?.chance
    //                       ) === "low" ? (
    //                       <img
    //                         src="/CaretDown.svg"
    //                         style={{
    //                           color: "red",
    //                           transform: "translate(rotate(-180deg))",
    //                         }}
    //                         alt="icon"
    //                       />
    //                     ) : (
    //                       <img src="/CaretEqual.svg" alt="icon" />
    //                     )}
    //                     {prevCounterQuestion[predict.questionNumber - 3] &&
    //                     Math.abs(
    //                       prevCounterQuestion[predict.questionNumber - 3]?.chance -
    //                         prevCounterQuestion[predict.questionNumber - 2]?.chance
    //                     ) !== 0
    //                       ? "%"
    //                       : ""}
    //                     {prevCounterQuestion[predict.questionNumber - 3]
    //                       ? Math.abs(
    //                           prevCounterQuestion[predict.questionNumber - 3]?.chance -
    //                             prevCounterQuestion[predict.questionNumber - 2]?.chance
    //                         ) !== 0
    //                         ? Math.abs(
    //                             prevCounterQuestion[predict.questionNumber - 3]?.chance -
    //                               prevCounterQuestion[predict.questionNumber - 2]?.chance
    //                           )
    //                         : ""
    //                       : ""}{" "}
    //                     {isNumberIncreasing(
    //                       prevCounterQuestion[predict.questionNumber - 3]?.chance,
    //                       prevCounterQuestion[predict.questionNumber - 2]?.chance
    //                     ) === "equal"
    //                       ? "بدون تغییر"
    //                       : "تغییر به نسبت سوال قبل"}
    //                   </p>
    //                 </div>
    //               </div>
    //               <div className={styles.potansielChanceBox}>
    //                 <div className={styles.potansielChanceBoxHeader}>
    //                   <div>
    //                     <p style={{ marginBottom: "20px" }}>شناخت ویزارد شما</p>
    //                     %<CountUp end={predict.potential} />
    //                   </div>
    //                   <ChancePotentialModal
    //                     title="potential"
    //                     description="هرچه شناخت ویزارد از شما بیشتر باشد، پاسخی که می‌دهد به واقعیت نزدیک
    //         خواهد بود. پس لطفا به تا پایان گفتگو، همراهش بمانید و با دقت به
    //         سوالاتش پاسخ دهید."
    //                   />
    //                 </div>
    //                 <Progress percent={predict.potential} status="active" strokeColor="#00ac87" />
    //                 <div className="potansielChanceBoxFooter">
    //                   <p
    //                     style={{
    //                       display: "flex",
    //                       alignItems: "center",
    //                       gap: "10px",
    //                     }}
    //                   >
    //                     {isNumberIncreasing(
    //                       prevCounterQuestion[predict.questionNumber - 3]?.potential,
    //                       prevCounterQuestion[predict.questionNumber - 2]?.potential
    //                     ) === "more" ? (
    //                       <img src="/CaretUp.svg" alt="icon" />
    //                     ) : isNumberIncreasing(
    //                         prevCounterQuestion[predict.questionNumber - 3]?.potential,
    //                         prevCounterQuestion[predict.questionNumber - 2]?.potential
    //                       ) === "low" ? (
    //                       <img
    //                         src="/CaretDown.svg"
    //                         style={{
    //                           color: "red",
    //                           transform: "translate(rotate(-180deg))",
    //                         }}
    //                         alt="icon"
    //                       />
    //                     ) : (
    //                       <img src="/CaretEqual.svg" alt="icon" />
    //                     )}
    //                     {prevCounterQuestion[predict.questionNumber - 3] ? "%" : ""}
    //                     {prevCounterQuestion[predict.questionNumber - 3]
    //                       ? Math.abs(
    //                           prevCounterQuestion[predict.questionNumber - 3]?.potential -
    //                             prevCounterQuestion[predict.questionNumber - 2]?.potential
    //                         )
    //                       : ""}{" "}
    //                     {isNumberIncreasing(
    //                       prevCounterQuestion[predict.questionNumber - 3]?.potential,
    //                       prevCounterQuestion[predict.questionNumber - 2]?.potential
    //                     ) === "equal"
    //                       ? "بدون تغییر"
    //                       : "تغییر به نسبت سوال قبل"}
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div
    //         className={styles.mainSliderLeft}
    //         style={{
    //           background: "#fff",
    //           height: "100%",
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           position: "relative",
    //           padding: "10px",
    //         }}
    //       >
    //         <MyChart questionCounter={questionCounter} prevCounterQuestion={prevCounterQuestion} />
    //         <div
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //             gap: "10px",
    //           }}
    //         >
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               gap: "6px",
    //               textDecoration: "underline",
    //             }}
    //           >
    //             <Modal title="شغلی" title_en="career" />
    //           </div>
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               gap: "6px",
    //               textDecoration: "underline",
    //             }}
    //           >
    //             <Modal title="عاطفی" title_en="emotional" />
    //           </div>
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               gap: "6px",
    //               textDecoration: "underline",
    //             }}
    //           >
    //             <Modal title="هدف" title_en="purpose" />
    //           </div>
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               gap: "6px",
    //               textDecoration: "underline",
    //             }}
    //           >
    //             <Modal title="اقتصادی" title_en="financial" />
    //           </div>
    //         </div>
    //         <div className={styles.footerChart}>
    //           <div>
    //             <div className={styles.povNowAnswer}></div>
    //             <p>موقعیت نسبت به پاسخ مرحله فعلی</p>
    //           </div>
    //           <div>
    //             <div className={styles.povOldAnswer}></div>
    //             <p>موقعیت نسبت به پاسخ مرحله قبل</p>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </div>
    <></>
  );
}
