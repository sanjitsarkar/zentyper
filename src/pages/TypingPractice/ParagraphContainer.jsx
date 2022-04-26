import React from "react";
import { useTyping } from "../../contexts/TypingContext";

const ParagraphContainer = () => {
  const { paragraphs, typed, wrongCharIndex, timerRef } = useTyping();
  return (
    <div
      ref={timerRef}
      className="py-10 px-5 text-xl text-slate-900 bg-slate-200 max-h-72 overflow-x-hidden overflow-y-auto font-mono "
    >
      {[...paragraphs].map((char, i) => {
        return (
          <span
            key={i}
            className={`${typed.length === i ? "active-char" : ""}${
              i <= typed.length - 1 && wrongCharIndex.includes(i)
                ? "wrong-char"
                : ""
            }${
              i <= typed.length - 1 && !wrongCharIndex.includes(i)
                ? "correct-char"
                : ""
            } ${char == " " ? "p-0.5" : ""}`}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default ParagraphContainer;
