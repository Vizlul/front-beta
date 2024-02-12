export const ArrowChanceIcon = ({ start, end }) => {
  function isNumberIncreasing(previousNumber, currentNumber) {
    return currentNumber > previousNumber
      ? "more"
      : currentNumber < previousNumber
      ? "low"
      : currentNumber === previousNumber
      ? "equal"
      : "";
  }

  return (
    <svg
      style={{
        transform:
          isNumberIncreasing(start, end) === "more"
            ? "rotate(90deg)"
            : isNumberIncreasing(start, end) === "low"
            ? "rotate(-90deg)"
            : "rotate(0deg)",
        transition: "all ease .3s",
        fontSize: "30px",
      }}
      width="6"
      height="14"
      viewBox="0 0 6 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.42 2.257.213 6.747a.342.342 0 0 0 0 .506l5.207 4.49c.194.166.478.016.478-.253V2.51c0-.27-.284-.42-.478-.253z"
        fill={
          isNumberIncreasing(start, end) === "more"
            ? "#008000"
            : isNumberIncreasing(start, end) === "low"
            ? "#FF0000"
            : "#000"
        }
      />
    </svg>
  );
};
