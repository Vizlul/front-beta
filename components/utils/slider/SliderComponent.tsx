import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./SliderComponent.module.css";
import { AiOutlineCheck, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { questions } from "@/utils/QuestionJson";
import { getQuestionText } from "@/utils/QuestionText";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

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
        // allowTouchMove={false}
        // allowSlidePrev={true}
        // allowSlideNext={true}
        onSwiper={setSwiper}
        spaceBetween={10}
        slidesPerView={3}
        autoplay={{
          "delay": 2500,
          "disableOnInteraction": false
        }}
        className={styles.mySwiper}
        breakpoints={{
          360: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
      >
        {/* {questions.map((item, index) => ( */}
        <SwiperSlide>
          <div className={styles.carouselQuestions}>
            <p style={{ textAlign: "right" }}>
              ویزارد اولین مدل هوش مصنوعی مشاوره ویزاست که با مشارکت بهترین کارشناسان ویزا و متخصصین هوش مصنوعی ویزالند تولید شده تا به
              اولین پیش‌گوی ویزا تبدیل شود.
            </p>
            {/* <div className={styles.carouselQuestionsMain}>
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
              </div> */}
            {/* <div className={styles.questionText}>
                <p>{item.question.length > 20 ? `${item.question.slice(0, 20)}...` : item.question}</p>
              </div> */}
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <p style={{ textAlign: "right" }}>
            در طول فرآیند پاسخگویی به سوالات، شانس ویزا شدن پرونده شما در هر مرحله، توسط ویزارد و با توجه به اطلاعاتی که تا همان مرحله در
            اختیارش قرار داده‌اید مشخص خواهد شد.
          </p>
        </SwiperSlide>

        <SwiperSlide>
          <p style={{ textAlign: "right" }}>
            هرچه شناخت ویزارد از شما بیشتر باشد، پاسخی که می‌دهد به واقعیت نزدیک خواهد بود. پس لطفا به تا پایان گفتگو، همراهش بمانید و با
            دقت به سوالاتش پاسخ دهید.
          </p>
        </SwiperSlide>

        <SwiperSlide>
          <p style={{ textAlign: "right" }}>
            اطلاعاتی که شما ثبت می‌کنید، پس از مدتی از پایگاه داده‌های ویزا حذف خواهند شد. ما و ویزارد از هیچ‌یک از پاسخ‌های شما هیچ‌گونه
            استفاده‌ای نخواهیم کرد.
          </p>
        </SwiperSlide>
        {/* ))} */}
      </Swiper>
      <div className={styles.buttonGroupsQuestions}>
        <button
          // disabled={predict.countAnswer === updateSlider + 1 || predict.countAnswer === 1}
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
