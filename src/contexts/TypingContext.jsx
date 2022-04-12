import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { pressKey } from "../utils";

const TypingContext = createContext();
const words = [
  "the",
  "be",
  "of",
  "and",
  "a",
  "to",
  "in",
  "he",
  "have",
  "it",
  "that",
  "for",
  "they",
  "I",
  "with",
  "as",
  "not",
  "on",
  "she",
  "at",
  "by",
  "this",
  "we",
  "you",
  "do",
  "but",
  "from",
  "or",
  "which",
  "one",
  "would",
  "all",
  "will",
  "there",
  "say",
  "who",
  "make",
  "when",
  "can",
  "more",
  "if",
  "no",
  "man",
  "out",
  "other",
  "so",
  "what",
  "time",
  "up",
  "go",
  "about",
  "than",
  "into",
  "could",
  "state",
  "only",
  "new",
  "year",
  "some",
  "take",
  "come",
  "these",
  "know",
  "see",
  "use",
  "get",
  "like",
  "then",
  "first",
  "any",
  "work",
  "now",
  "may",
  "such",
  "give",
  "over",
  "think",
  "most",
  "even",
  "find",
  "day",
  "also",
  "after",
  "way",
  "many",
  "must",
  "look",
  "before",
  "great",
  "back",
  "through",
  "long",
  "where",
  "much",
  "should",
  "well",
  "people",
  "down",
  "own",
  "just",
  "because",
  "good",
  "each",
  "those",
  "feel",
  "seem",
  "how",
  "high",
  "too",
  "place",
  "little",
  "world",
  "very",
  "still",
  "nation",
  "hand",
  "old",
  "life",
  "tell",
  "write",
  "become",
  "here",
  "show",
  "house",
  "both",
  "between",
  "need",
  "mean",
  "call",
  "develop",
  "under",
  "last",
  "right",
  "move",
  "thing",
  "general",
  "school",
  "never",
  "same",
  "another",
  "begin",
  "while",
  "number",
  "part",
  "turn",
  "real",
  "leave",
  "might",
  "want",
  "point",
  "form",
  "off",
  "child",
  "few",
  "small",
  "since",
  "against",
  "ask",
  "late",
  "home",
  "interest",
  "large",
  "person",
  "end",
  "open",
  "public",
  "follow",
  "during",
  "present",
  "without",
  "again",
  "hold",
  "govern",
  "around",
  "possible",
  "head",
  "consider",
  "word",
  "program",
  "problem",
  "however",
  "lead",
  "system",
  "set",
  "order",
  "eye",
  "plan",
  "run",
  "keep",
  "face",
  "fact",
  "group",
  "play",
  "stand",
  "increase",
  "early",
  "course",
  "change",
  "help",
  "line",
];
const TypingProvider = ({ children }) => {
  const [accuracy, setAccuracy] = useState(100);
  const [time, setTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [wrongCharIndex, setWrongCharIndex] = useState([]);
  const [isPaused, setIsPaused] = useState(true);
  const [isRestarted, setIsRestarted] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [wrongIndex, setWrongIndex] = useState(-1);
  let _charCount = 0,
    _wrongIndex = -1;
  const [paragraphs, setParagraphs] = useState(
    words
      .map((x) => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((a) => a.x)
      .slice(0, 50)
      .join(" ")
  );

  const [typed, setTyped] = useState("");
  const [timerInterval, setTimerInterval] = useState();
  const reStart = () => {
    setParagraphs(() =>
      words
        .map((x) => ({ x, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map((a) => a.x)
        .slice(0, 50)
        .join(" ")
    );
    setIsRestarted(() => true);
    setIsPaused(() => true);
    setTyped("");
    setTime(() => 0);
    setWordCount(() => 0);
    setAccuracy(() => 0);
    setWrongCharIndex([]);
    setCharCount(() => 0);
    setWrongIndex(() => -1);
    clearInterval(timerInterval);
  };

  const fetchWords = (n = 100) => {
    setParagraphs(() =>
      words
        .map((x) => ({ x, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map((a) => a.x)
        .slice(0, n)
        .join(" ")
    );
  };

  useEffect(() => {
    if (!isPaused) {
      setTimerInterval(
        setInterval(() => {
          setTime((_time) => _time + 1);
        }, 1000)
      );
    } else {
      clearInterval(timerInterval);
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
    window.addEventListener("keydown", (e) => {
      console.log(paragraphs);
      console.log(_charCount, _wrongIndex);
      console.log(wrongCharIndex);
      console.log(typed);
      pressKey(e);
      setIsBlur(() => false);
      if (isPaused) {
        setIsPaused(() => false);
      }

      if (
        ((e.keyCode >= 48 && e.keyCode <= 90) ||
          e.keyCode === 32 ||
          (e.keyCode >= 186 && e.keyCode <= 222)) &&
        e.key === paragraphs[_charCount]
      ) {
        setTyped((_typed) => _typed + e.key);
        _charCount++;
      } else if (e.keyCode !== 16 && e.keyCode !== 20) {
        _charCount !== _wrongIndex &&
          setWrongCharIndex((_wrongCharIndex) => [
            ..._wrongCharIndex,
            _charCount,
          ]);
        _wrongIndex = _charCount;
      }
    });
  }, [window, isRestarted]);

  useLayoutEffect(() => {
    window.addEventListener("blur", () => {
      setIsBlur(true);
    });
  }, [window]);

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
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

const useTyping = () => useContext(TypingContext);
export { useTyping, TypingProvider };
