import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SliderComponent.module.css";
import { AiOutlineCheck, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { questions } from "@/utils/QuestionJson";
import { getQuestionText } from "@/utils/QuestionText";

// Import Swiper styles
import "swiper/css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useSelector } from "react-redux";
import { PredictInterface } from "@/store/features/predictSlice";
import { Button } from "antd";

export default function SliderComponent() {
  const predict = useSelector((state: { predict: PredictInterface }) => state.predict);

  return (
    <>
      <Swiper spaceBetween={10} slidesPerView={3} className={styles.mySwiper}>
        {questions.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={styles.carouselQuestions}>
              <div className={styles.carouselQuestionsMain}>
                {predict.countAnswer > index + 1 ? (
                  <div className={styles.borderBoxCompeleted}>
                    <AiOutlineCheck />
                  </div>
                ) : predict.countAnswer < index + 1 || predict.countAnswer === index + 1 ? (
                  <div className={styles.borderBox}>
                    <span>{index + 1}</span>
                  </div>
                ) : (
                  ""
                )}

                <p>{getQuestionText(index + 1)}</p>
                <span style={{ width: "50px", height: "1px", backgroundColor: "#00554e" }}></span>
              </div>
              <div className={styles.questionText}>
                <p>{item.question.length > 20 ? `${item.question.slice(0, 20)}...` : item.question}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.buttonGroupsQuestions}>
        <Button style={{ display: "flex", alignItems: "center" }}>
          <AiOutlineArrowLeft />
        </Button>
        <Button disabled={predict.countAnswer === predict.questionIndex + 1} style={{ display: "flex", alignItems: "center" }}>
          <AiOutlineArrowRight />{" "}
        </Button>
      </div>
    </>
  );
}
