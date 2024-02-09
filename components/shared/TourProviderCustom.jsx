import { TourProvider, useTour } from "@reactour/tour";
import MainSliderMobile from "../steps/mobile/MainSliderMobile";
import { useEffect, useState } from "react";

export default function TourProviderCustom() {
  const [answerPopup, setAnswerPopup] = useState(false);
  const [disableInteraction, setDisableIntract] = useState(false);
  const { setCurrentStep, currentStep } = useTour();
  console.log(currentStep);
  const tourConfig = (setDisableIntract) => {
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
          console.log("khob dobare true mishe dige");
          console.log(node);
          // Or whatever event you're waiting for
          node.onclick = () => {
            setDisableIntract(false);
            console.log("tets");

            // ...
          };
        },
        observe: '[data-tut="reactour__state--observe"]',
      },
      {
        selector: '[data-tut="reactour__3"]',
        content: `تست 3`,
      },
      {
        selector: '[data-tut="reactour__4"]',
        content: `تست 4`,
      },
      {
        selector: '[data-tut="reactour__5"]',
        content: ({ goTo }) => (
          <div>
            If you wanna go anywhere, skipping places, it is absolutely possible.
            <br /> "Oh, I forgot something inside the bus…"{" "}
            <button
              style={{
                border: "1px solid #f7f7f7",
                background: "none",
                padding: ".3em .7em",
                fontSize: "inherit",
                display: "block",
                cursor: "pointer",
                margin: "1em auto",
              }}
              onClick={() => goTo(1)}
            >
              {" "}
              <span aria-label="bus" role="img">
                🚌
              </span>
            </button>
          </div>
        ),
      },
    ];
  };

  useEffect(() => {
    if (!answerPopup) {
      setCurrentStep(3);
      console.log("abdagdgduygy")
    }
  }, [answerPopup])

  return (
    <TourProvider
      rtl
      steps={tourConfig(setDisableIntract)}
      disableDotsNavigation
      disableInteraction={disableInteraction}
      onClickHighlighted={(e, clickProps) => {
        e.stopPropagation();
        console.log("No interaction");
        if (clickProps.currentStep === 1) {
          setDisableIntract(false);
          clickProps.setCurrentStep(2);
          setAnswerPopup(true);
        }
      }}
      onClickClose={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (steps) {
          if (currentStep === steps.length - 1) {
            setIsOpen(false);
          }
          setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
        }
      }}
      prevButton={({ currentStep, setCurrentStep, steps }) => {
        const first = currentStep === 0;
        return (
          <button
            onClick={() => {
              if (first) {
                setCurrentStep((s) => steps.length - 1);
              } else {
                setCurrentStep((s) => s - 1);
              }
            }}
          >
            Back
          </button>
        );
      }}
      nextButton={({ Button, currentStep, stepsLength, setIsOpen, setCurrentStep, steps }) => {
        const last = currentStep === stepsLength - 1;
        return (
          !disableInteraction && (
            <Button
              onClick={() => {
                if (last) {
                  setIsOpen(false);
                } else {
                  if (currentStep === 2) {
                    setAnswerPopup(false);
                  }
                  setCurrentStep((s) => (s === steps?.length - 1 ? 0 : s + 1));
                }
              }}
            >
              {last ? "Close!" : null}
            </Button>
          )
        );
      }}
    >
      <MainSliderMobile answerPopup={answerPopup} setAnswerPopup={setAnswerPopup} />
    </TourProvider>
  );
}
