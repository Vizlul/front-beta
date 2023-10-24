import React, { useEffect, useState } from "react";

const NumberCounterAnimate = (number: number) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  let interval : any = null;

  const updateDisplayNumber = () => {
    clearInterval(interval);

    if (number === displayNumber) {
      return;
    }

    interval = setInterval(() => {
      if (displayNumber !== number) {
        const change = (number - displayNumber) / 10;
        setDisplayNumber(displayNumber + (change >= 0 ? Math.ceil(change) : Math.floor(change)));
      }
    }, 40);
  };

  useEffect(() => {
    updateDisplayNumber();
  }, [number]);

  useEffect(() => {
    setDisplayNumber(number || 0);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>Display Number: {displayNumber}</p>
      {/* Additional JSX content can go here */}
    </div>
  );
};

export default NumberCounterAnimate;