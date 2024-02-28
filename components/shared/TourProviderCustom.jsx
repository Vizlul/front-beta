"use client";
import { TourProvider, useTour } from "@reactour/tour";
import MainSliderMobile from "../steps/mobile/main/MainSliderMobile";
import { useEffect, useRef, useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import styles from "./TourProvider.module.css";

const tourSteps = (setDisableIntract, setActiveButtonTour) => {
  return [
    {
      selector: '[data-tut="reactour__1"]',
      content: `به ویزارد خیلی خوش اومدی راهنما رو دنبال کن تا با محیط ویزارد آشنا بشی`,
    },
    {
      selector: '[data-tut="reactour__2"]',
      content: `برای مشاهده سوال و پاسخ به اون روی قسمت سبز رنگ ضربه بزنید`,
      action: (node) => {
        setDisableIntract(true);
      },
      observe: '[data-tut="reactour__state--observe"]',
    },
    {
      selector: '[data-tut="reactour__3"]',
      content: `این قسمت به عنوان محل ثبت پاسخ به پرسش‌های ویزارد می باشد. لازم است حداقل یک گزینه را انتخاب و سپس بر روی دکمه "ثبت پاسخ" ضربه بزنید تا وارد مرحله بعدی شوید.`,
      action: (node) => {
        setActiveButtonTour(true);
      },
    },
    {
      selector: '[data-tut="reactour__5"]',
      content: `در این بخش، نمودار وابستگی‌ها و مشاوره‌های شما در چهار پارامتر اصلی شامل وابستگی عاطفی، شغلی، اقتصادی و هدف از سفر را ارائه می‌دهیم. با پاسخ دادن به هر سوال، می‌توانید با ضربه زدن روی هر پارامتر تأثیر جواب انتخابی و مشاوره لحظه ای بهره مند شوید.`,
    },
    {
      selector: '[data-tut="reactour__4"]',
      content: `این قسمت نمودار شانس اخذ ویزا شما به نسبت نوع پاسخی که به هر سوال داده می شود نمایش می دهیم.`,
    },
    {
      selector: '[data-tut="reactour__6"]',
      content: `
      در این بخش، نمودار تغییرات پارامترهای وابستگی در سوال فعلی نسبت به سوال قبلی را نمایش می‌دهیم`,
    },
    {
      selector: '[data-tut="reactour__7"]',
      content: `اینجا نمودار شانس شما رو داریم`,
    },
    {
      selector: '[data-tut="reactour__8"]',
      content: `این بخش درصد شناخت هوش مصنوعی ویزارد از شما را نمایش می دهیم`,
    },
    {
      selector: '[data-tut="reactour__9"]',
      content: `این قسمت شانس اخذ ویزا شما به صورت لحظه ای در واکنش به هر سوال تغییر پیدا می کند`,
    },
  ];
};

export default function TourProviderCustom({ isMobile }) {
  const [answerPopup, setAnswerPopup] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [disableInteraction, setDisableIntract] = useState(false);
  const { currentStep, setCurrentStep } = useTour();
  const [activeButtonTour, setActiveButtonTour] = useState(false);
  // disable body scroll
  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);
  // onClickHighlighted react tour
  const onClickHighlighted = (e, clickProps) => {
    e.stopPropagation();
    if (clickProps.currentStep === 1) {
      setDisableIntract(false);
      clickProps.setCurrentStep(2);
      setAnswerPopup(true);
    }
  };
  // close button react tour
  const onClickClose = ({ setCurrentStep, currentStep, steps, setIsOpen }) => {
    console.log("adbgausygda");
    setIsOpen(true);
  };
  // prev button react tour
  const prevButton = ({ currentStep, setCurrentStep, steps }) => {
    const first = currentStep === 0;
    console.log(currentStep);
    return (
      <button
        className={styles.button}
        disabled={currentStep === 0}
        onClick={() => {
          if (first) {
            setCurrentStep((s) => steps.length - 1);
            setActiveButtonTour(false);
            setDisableIntract(false);
          } else if (currentStep === 2) {
            setAnswerPopup(false);
            setCurrentStep((s) => s - 1);
          } else if (currentStep === 3) {
            setAnswerPopup(true);
            setCurrentStep((s) => s - 1);
          } else {
            setCurrentStep((s) => s - 1);
            setActiveButtonTour(false);
            setDisableIntract(false);
          }
        }}
      >
        بازگشت
      </button>
    );
  };

  // next button react tour
  const nextButton = ({ Button, currentStep, stepsLength, setIsOpen, setCurrentStep, steps }) => {
    const last = currentStep === stepsLength - 1;
    return (
      !disableInteraction && (
        <button
          className={styles.button}
          disabled={activeButtonTour}
          onClick={() => {
            if (last) {
              setIsOpen(false);
              localStorage.setItem("tour", "true");
              window.location.reload();
            } else if (currentStep === 2) {
              setCurrentStep((s) => s + 1);
            } else {
              if (currentStep === 2) {
                setAnswerPopup(false);
              }
              setCurrentStep((s) => (s === steps?.length - 1 ? 0 : s + 1));
            }
          }}
        >
          {last ? "شروع" : "بعدی"}
        </button>
      )
    );
  };
  // useEffect for change step after close answerPopup
  useEffect(() => {
    if (!answerPopup) {
      setCurrentStep(3);
    }
  }, [answerPopup]);

  useEffect(() => {
    document.documentElement.style.setProperty("--tour-width", `${window.innerWidth}px`);
  }, []);

  return (
    <TourProvider
      afterOpen={disableBody}
      beforeClose={enableBody}
      rtl
      steps={tourSteps(setDisableIntract, setActiveButtonTour)}
      disableDotsNavigation
      disableInteraction={disableInteraction}
      onClickHighlighted={onClickHighlighted}
      onClickMask={onClickClose}
      prevButton={prevButton}
      nextButton={nextButton}
      position="bottom"
      badgeContent={({ totalSteps, currentStep }) => <span>{`${currentStep + 1} از ${totalSteps}`}</span>}
    >
      <MainSliderMobile
        answerPopup={answerPopup}
        setAnswerPopup={setAnswerPopup}
        answer={answer}
        setAnswer={setAnswer}
        setActiveButtonTour={setActiveButtonTour}
      />
    </TourProvider>
  );
}
