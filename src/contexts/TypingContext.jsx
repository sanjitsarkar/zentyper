import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { genrateRandomParagraphs, pressKey } from "../utils";

const TypingContext = createContext();

const TypingProvider = ({ children }) => {
  const [accuracy, setAccuracy] = useState(100);
  const [time, setTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [wrongCharIndex, setWrongCharIndex] = useState([]);
  const [isPaused, setIsPaused] = useState(true);
  const [isBlur, setIsBlur] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [wrongIndex, setWrongIndex] = useState(-1);
  const timerRef = useRef();
  const [typed, setTyped] = useState("");
  const [wordLength, setWordLength] = useState(50);
  const [paragraphs, setParagraphs] = useState(
    genrateRandomParagraphs(wordLength)
  );
  const reStart = () => {
    setParagraphs(genrateRandomParagraphs(wordLength));
    setIsPaused(true);
    setTyped("");
    setTime(0);
    setWordCount(0);
    setAccuracy(0);
    setWrongCharIndex([]);
    setCharCount(0);
    setWrongIndex(-1);
    clearInterval(timerRef.current);
  };
  useEffect(() => {
    genrateRandomParagraphs(wordLength);
  }, [wordLength]);
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTime((_time) => _time + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
  }, [isPaused]);

  useEffect(() => {
    if (
      paragraphs[typed.length - 1] === " " ||
      typed.length - 1 === paragraphs.length - 1
    ) {
      setWordCount(wordCount + 1);
    }
    if (typed.length === paragraphs.length) {
      reStart();
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
  const handleKeyDown = (e) => {
    pressKey(e);
    setIsBlur(false);
    if (isPaused) {
      setIsPaused(false);
    }
    if (e.keyCode === 82 && e.ctrlKey) {
      e.preventDefault();
      reStart();
    }
    if (e.keyCode === 32 && e.ctrlKey) {
      setIsPaused(true);
    } else if (
      ((e.keyCode >= 48 && e.keyCode <= 90) ||
        e.keyCode === 32 ||
        (e.keyCode >= 186 && e.keyCode <= 222)) &&
      e.key === paragraphs[charCount]
    ) {
      setTyped((prevTyped) => prevTyped + e.key);
      setCharCount((prevCharCount) => prevCharCount + 1);
    } else if (e.keyCode !== 16 && e.keyCode !== 20) {
      charCount !== wrongIndex &&
        setWrongCharIndex((_wrongCharIndex) => [..._wrongCharIndex, charCount]);
      setWrongIndex(charCount);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  useLayoutEffect(() => {
    window.addEventListener("blur", () => {
      setIsBlur(true);
    });
  });

  return (
    <TypingContext.Provider
      value={{
        accuracy,
        setAccuracy,
        isPaused,
        setIsPaused,
        paragraphs,
        setParagraphs,
        typed,
        setTyped,
        time,
        setTime,
        setWordCount,
        wordCount,
        wrongCharIndex,
        setWrongCharIndex,
        reStart,
        isBlur,
        setIsBlur,
        timerRef,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

const useTyping = () => useContext(TypingContext);
export { useTyping, TypingProvider };
