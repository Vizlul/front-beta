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
        ) : questions[currentQuestionIndex].type === "radio_unique" ? (
          questions[currentQuestionIndex].answer.value_fa.map((item, index) => (
            <button
              className={activeButton === index && styles.activeButton}
              key={index}
              onClick={() => {
                handleChange(index, questions[currentQuestionIndex].type, questions[currentQuestionIndex].answer.key_en[index]);
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
            <button
              onClick={() =>
                setAnswer((prevValue) =>
                  prevValue < questions[currentQuestionIndex].answer.value_fa[1]
                    ? Number(prevValue + 1)
                    : Number(prevValue)
                )
              }
            >
              +
            </button>
            <input
              style={{ maxWidth: "400px" }}
              type="number"
              min={questions[currentQuestionIndex].answer.value_fa[0]}
              max={questions[currentQuestionIndex].answer.value_fa[1]}
              value={answer}
              defaultValue={questions[currentQuestionIndex].answer.value_fa[0]}
              onChange={(event) => handleChange(event.target.value, "number")}
            />
            <button
              onClick={() =>
                setAnswer((prevValue) =>
                  prevValue > questions[currentQuestionIndex].answer.value_fa[0]
                    ? Number(prevValue - 1)
                    : Number(prevValue)
                )
              }
            >
              -
            </button>
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
            fontSize="16px"
            onClickFunc={() => setOpenSimilarDocsPopup(true)}
            title="مشاهده پرونده مشابه شما"
            width="200px"
          ></ButtonComponent>
        ) : (
          <ButtonComponent
            fontSize="16px"
            width="140px"
            title="ثبت پاسخ"
            onClickFunc={handleSubmit}
            disabledFunc={answer === null && true}
            loading={loading}
            icon={<img src="forward-arrow.svg" alt="arrow-forward" />}
          ></ButtonComponent>
        )}

        <ButtonComponent
          fontSize="16px"
          width="145px"
          title="اطلاعات بیشتر"
          onClickFunc={() => setVideoPopup(true)}
          disabledFunc={!finsihed && true}
        ></ButtonComponent>
      </div>
    </div>
  );
}
