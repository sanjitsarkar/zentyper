import React, { useEffect, useState } from "react";
import TypingHeader from "./TypingHeader";

const TypingPractice = () => {
  const [accuracy, setAccuracy] = useState(100);
  const [time, setTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [wrongCharIndex, setWrongCharIndex] = useState([]);
  const [paragraphs, setParagraphs] = useState(
    "The, at there  some my of be use her than and this an would first a have each make water"
  );

  const [typed, setTyped] = useState("");
  const [timerInterval, setTimerInterval] = useState();
  useEffect(() => {
    setTimerInterval(() =>
      setInterval(() => {
        setTime((time) => time + 1);
      }, 1000)
    );
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (
      paragraphs[typed.length - 1] === " " ||
      typed.length - 1 === paragraphs.length - 1
    ) {
      setWordCount(wordCount + 1);
    }
    if (typed.length === paragraphs.length) {
      clearInterval(timerInterval);
    }
  }, [typed]);
  useEffect(() => {
    if (typed.length)
      setAccuracy(
        Math.floor(
          ((typed.length - wrongCharIndex.length) / typed.length) * 100
        )
      );
  }, [wrongCharIndex, typed]);

  useEffect(() => {
    let charCount = 0,
      wrongIndex = -1;
    window.addEventListener("keydown", (e) => {
      if (
        ((e.keyCode >= 48 && e.keyCode <= 90) ||
          e.keyCode === 32 ||
          (e.keyCode >= 186 && e.keyCode <= 222)) &&
        e.key === paragraphs[charCount]
      ) {
        setTyped((_typed) => _typed + e.key);
        charCount++;
      } else if (e.keyCode !== 16 && e.keyCode !== 20) {
        charCount !== wrongIndex &&
          setWrongCharIndex((_wrongCharIndex) => [
            ..._wrongCharIndex,
            charCount,
          ]);
        wrongIndex = charCount;
      }
    });
  }, [window]);

  return (
    <div>
      <TypingHeader
        accuracy={accuracy}
        wpm={Math.floor((wordCount / time) * 60)}
        incorrect={wrongCharIndex.length}
        time={time}
      />
      <div>
        {[...paragraphs].map((char, i) => {
          return (
            <span
              key={i}
              className={`
              ${
                i <= typed.length - 1 && wrongCharIndex.includes(i)
                  ? "wrong-char"
                  : ""
              }
              ${
                i <= typed.length - 1 && !wrongCharIndex.includes(i)
                  ? "correct-char"
                  : ""
              }
              ${typed.length === i ? "active-char" : ""}`}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TypingPractice;
