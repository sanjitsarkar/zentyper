import React from "react";

const TypingHeader = ({ accuracy, wpm, incorrect, time }) => {
  return (
    <div>
      <h1></h1>
      <h1>Accuracy: {accuracy}</h1>
      <h1>EPM: {wpm}</h1>
      <h1>Incorrect: {incorrect}</h1>
      <h1>Time: {time}</h1>
    </div>
  );
};

export default TypingHeader;
