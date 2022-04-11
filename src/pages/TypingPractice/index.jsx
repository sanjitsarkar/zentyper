import React, { useEffect, useState } from "react";
import TypingHeader from "./TypingHeader";

const TypingPractice = () => {
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [time, setTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [curKey, setCurKey] = useState("");
  const [wrongCharIndex, setWrongCharIndex] = useState([]);
  const [start, setStart] = useState(false);

  const [paragraphs, setParagraphs] = useState(
    "the at there some my of be use her than and this an would first a have each make water"
  );

  const [typed, setTyped] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [start]);
  useEffect(() => {
    // if (
    //   typed.length > 0 &&
    //   typed[typed.length - 1] !== paragraphs[typed.length - 1]
    // ) {
    //   setWrongCharIndex((_wrongCharIndex) => [
    //     ..._wrongCharIndex,
    //     typed.length - 1,
    //   ]);
    // }
    // if (typed.length === 0) setWrongCharIndex([]);
    // if (typed.length >= 0 && wrongCharIndex.includes(typed.length - 1)) {
    //   setWrongCharIndex((_wrongCharIndex) =>
    //     _wrongCharIndex.filter((index) => index !== typed.length - 1)
    //   );
    // }
    if (
      paragraphs[typed.length - 1] === " " ||
      typed.length - 1 === paragraphs.length - 1
    ) {
      setWordCount(wordCount + 1);
    }
  }, [typed]);
  useEffect(() => {
    console.log(wrongCharIndex);
    if (typed.length)
      setAccuracy(
        Math.floor(
          ((typed.length - wrongCharIndex.length) / typed.length) * 100
        )
      );
  }, [wrongCharIndex, typed]);

  useEffect(() => {
    let charCount = 0,
      wrongIndex = 0;
    window.addEventListener("keydown", (e) => {
      console.log(e.key, paragraphs[charCount]);
      if (e.keyCode !== 13 && e.keyCode !== 8) {
        if (e.key !== paragraphs[charCount]) {
          if (charCount !== wrongIndex)
            setWrongCharIndex((_wrongCharIndex) => [
              ..._wrongCharIndex,
              charCount,
            ]);
          wrongIndex = charCount;
        } else {
          charCount++;
          setTyped((_typed) => _typed + e.key);
        }
      }
    });
  }, [window]);

  return (
    <div>
      <TypingHeader
        accuracy={accuracy}
        wpm={wpm}
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
              ${typed.length === i ? "active-char" : ""}`}
            >
              {char}
            </span>
          );
        })}
      </div>
      {/* {wordCount}
      <textarea
        defaultValue={typed}
        onKeyDown={(e) => {
          setCurKey(e.key);
        }}
        onChange={(e) => {
          console.log("curkey", curKey);
          if (curKey !== "Backspace" || curKey !== "Delete") {
            e.preventDefault();
          }
          if (!start) {
            setStart(true);
          }
          setTyped(e.target.value);
        }}
      ></textarea> */}
    </div>
  );
};

export default TypingPractice;
