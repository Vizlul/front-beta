import styles from "./QuestionBox.module.css";
import ButtonComponent from "@/components/shared/button/ButtonComponent";

export default function QuestionBox({
  questions,
  currentQuestionIndex,
  handleChange,
  handleSubmit,
  answer,
  setAnswer,
  questionCounter,
  loading,
  finsihed,
  setOpenSimilarDocsPopup,
  setVideoPopup,
  activeButton,
  setActiveButton,
}) {
  return (
    <div className={styles.questionBox}>
      <div className={styles.questionText}>
        <p>{questionCounter}</p>
        <p className={styles.slideRight} key={questionCounter}>
          {questions[currentQuestionIndex].question}
        </p>
      </div>

      <div key={questionCounter} className={`${styles.answerChioces} ${styles.slideLeft}`}>
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
              style={{ maxWidth: "400px" }}
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
                handleChange(questions[currentQuestionIndex].answer.value_en[index], "radio_multi");
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
        {finsihed ? (
          <ButtonComponent
            onClickFunc={() => setOpenSimilarDocsPopup(true)}
            title="مشاهده پرونده مشابه شما"
            width="200px"
          ></ButtonComponent>
        ) : (
          <ButtonComponent
            title="ثبت پاسخ"
            onClickFunc={handleSubmit}
            disabledFunc={answer === null && true}
            loading={loading}
            icon={<img src="forward-arrow.svg" alt="arrow-forward" />}
          ></ButtonComponent>
        )}

        <ButtonComponent
          title="اطلاعات بیشتر"
          onClickFunc={() => setVideoPopup(true)}
          disabledFunc={!finsihed && true}
        ></ButtonComponent>
      </div>
    </div>
  );
}
