import React from "react";

const TypingHeader = ({ accuracy, wpm, incorrect, time }) => {
  const convertTime = (time) => {
    if (time < 60) {
      return `${time} seconds`;
    }
    if (time < 3600) {
      return `${Math.floor(time / 60)} minutes ${time % 60} seconds`;
    }
    return `${Math.floor(time / 3600)} hours ${Math.floor(
      (time % 3600) / 60
    )} minutes ${time % 60} seconds`;
  };
  return (
    <div>
      <h1></h1>
      <h1>Accuracy: {accuracy}</h1>
      <h1>WPM: {wpm}</h1>
      <h1>Incorrect: {incorrect}</h1>
      <h1>Time: {convertTime(time)}</h1>
    </div>
  );
};

export default TypingHeader;
