import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SliderComponent.module.css";
import { AiOutlineCheck, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { questions } from "@/utils/QuestionJson";
import { getQuestionText } from "@/utils/QuestionText";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useSelector } from "react-redux";
import { PredictInterface } from "@/store/features/predictSlice";

export default function SliderComponent({ swiper, setSwiper }) {
  const predict = useSelector((state: { predict: PredictInterface }) => state.predict);
  const [updateSlider, setUpdateSlider] = useState(0);

  useEffect(() => {
    swiper?.slideTo(predict.countAnswer - 2);
    setUpdateSlider(predict.countSlider);
  }, [predict.countSlider]);

  const handleNextSlider = () => {
    setUpdateSlider((prev) => prev + 1);
    swiper.slideNext();
  };

  const handleBackSlider = () => {
    if (updateSlider !== 1) {
      setUpdateSlider((prev) => prev - 1);
      swiper.slidePrev();
    } else {
      return;
    }
  };

  return (
    <>
      <Swiper
        allowTouchMove={false}
        allowSlidePrev={true}
        allowSlideNext={true}
        onSwiper={setSwiper}
        spaceBetween={10}
        slidesPerView={3}
        className={styles.mySwiper}
      >
        {questions.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={styles.carouselQuestions}>
              <div className={styles.carouselQuestionsMain}>
                {predict.countAnswer > index + 1 ? (
                  <div className={styles.borderBoxCompeleted}>
                    <AiOutlineCheck />
                  </div>
                ) : predict.countAnswer === index + 1 ? (
                  <div className={styles.borderBoxNow}>
                    <span>{index + 1}</span>
                  </div>
                ) : (
                  <div className={styles.borderBox}>
                    <span>{index + 1}</span>
                  </div>
                )}
                {predict.countAnswer < index + 1 ? (
                  <>
                    <p style={{ color: "#d9d9d9" }} className={styles.questionNumber}>
                      {getQuestionText(index + 1)}
                    </p>
                    <span style={{ width: "50px", height: "1px", backgroundColor: "#d9d9d9" }}></span>
                  </>
                ) : (
                  <>
                    <p className={styles.questionNumber}>{getQuestionText(index + 1)}</p>
                    <span style={{ width: "50px", height: "1px", backgroundColor: "#00554e" }}></span>
                  </>
                )}
              </div>
              {/* <div className={styles.questionText}>
                <p>{item.question.length > 20 ? `${item.question.slice(0, 20)}...` : item.question}</p>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.buttonGroupsQuestions}>
        <button
          disabled={predict.countAnswer === updateSlider + 1 || predict.countAnswer === 1}
          onClick={() => handleNextSlider()}
          className={styles.sliderNext}
        >
          <AiOutlineArrowLeft />
        </button>
        <button disabled={updateSlider === 1} onClick={() => handleBackSlider()} className={styles.sliderPrev}>
          <AiOutlineArrowRight />{" "}
        </button>
      </div>
    </>
  );
}
