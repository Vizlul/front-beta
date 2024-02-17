import { TourProvider, useTour } from "@reactour/tour";
import MainSliderMobile from "../steps/mobile/MainSliderMobile";
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
      content: `برای مشاهده سوال و پاسخ به اون روی این قسمت ضربه بزنید`,
      action: (node) => {
        setDisableIntract(true);
      },
      observe: '[data-tut="reactour__state--observe"]',
    },
    {
      selector: '[data-tut="reactour__3"]',
      content: `یکی از گزینه های زیر را انتخاب کنید`,
      action: (node) => {
        setActiveButtonTour(true);
      },
    },
    {
      selector: '[data-tut="reactour__4"]',
      content: `اینجا نمودار شناخت شما رو داریم`,
    },
    {
      selector: '[data-tut="reactour__5"]',
      content: `اینجا نمودار وابستگی های شما رو داریم`,
    },
    {
      selector: '[data-tut="reactour__6"]',
      content: `اینجا نمودار توانایی های شما رو داریم`,
    },
    {
      selector: '[data-tut="reactour__7"]',
      content: `اینجا نمودار شانس شما رو داریم`,
    },
    {
      selector: '[data-tut="reactour__8"]',
      content: `شناخت ویزارد از شما`,
    },
    {
      selector: '[data-tut="reactour__9"]',
      content: `شانس اخذ ویزا شما`,
    },
  ];
};

export default function TourProviderCustom({ isMobile }) {
  const [answerPopup, setAnswerPopup] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [disableInteraction, setDisableIntract] = useState(false);
  const { setCurrentStep } = useTour();
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
    if (steps) {
      if (currentStep === steps.length - 1) {
        setIsOpen(false);
      }
      setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
    }
  };
  // prev button react tour
  const prevButton = ({ currentStep, setCurrentStep, steps }) => {
    const first = currentStep === 0;
    return (
      <button
        className={styles.button}
        onClick={() => {
          if (first) {
            setCurrentStep((s) => steps.length - 1);
            setActiveButtonTour(false);
            setDisableIntract(false);
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
            } else {
              if (currentStep === 2) {
                setAnswerPopup(false);
              } else if (currentStep === 5) {
                enableBodyScroll(tourRef.current);
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
      onClickClose={onClickClose}
      prevButton={prevButton}
      nextButton={nextButton}
      badgeContent={({ totalSteps, currentStep }) => (
        <span>{`${currentStep + 1} از ${totalSteps}`}</span>
      )}
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
