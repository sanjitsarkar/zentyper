import React from "react";
import ClickToFocus from "../../components/ClickToFocus";
import Keyboard from "../../components/Keyboard";
import { useTyping } from "../../contexts/TypingContext";
import ParagraphContainer from "./ParagraphContainer";
import TypingHeader from "./TypingHeader";

const TypingPractice = () => {
  const { isBlur } = useTyping();
  return (
    <div className="w-screen">
      {isBlur && <ClickToFocus />}
      <TypingHeader />
      <ParagraphContainer />
      <Keyboard />
    </div>
  );
};

export default TypingPractice;
