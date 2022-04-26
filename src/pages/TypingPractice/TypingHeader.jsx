import {
  faEllipsisV,
  faPause,
  faPlay,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTyping } from "../../contexts/TypingContext";
import { convertTime } from "../../utils";

const TypingHeader = () => {
  const {
    accuracy,
    isPaused,
    time,
    wordCount,
    wrongCharIndex,
    reStart,
    setIsPaused,
  } = useTyping();

  return (
    <div className="flex flex-wrap  gap-2 row justify-between p-4 bg-slate-700 text-slate-100  text-lg items-center">
      <div className="flex row gap-8">
        <h1>
          Accuracy: <span className="font-bold text-white ">{accuracy}%</span>
        </h1>
        <h1>
          WPM:{" "}
          <span className="font-bold text-white ">
            {time === 0 ? 0 : Math.floor((wordCount / time) * 60)}
          </span>
        </h1>
        <h1>
          Incorrect:{" "}
          <span className="font-bold text-white ">{wrongCharIndex.length}</span>
        </h1>
        <h1>
          Time:{" "}
          <span className="font-bold text-white ">{convertTime(time)}</span>
        </h1>
      </div>
      <div className="flex gap-6">
        <button
          className={` text-slate-900 w-9 aspect-square rounded-full ${
            isPaused ? "bg-green-400" : "bg-sky-400"
          }`}
          onClick={(e) => {
            setIsPaused(!isPaused);
            e.currentTarget.blur();
          }}
        >
          {!isPaused ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>

        <button
          className="px-3 py-1 flex gap-2  text-white items-center"
          onClick={(e) => {
            reStart();
            e.currentTarget.blur();
          }}
        >
          <FontAwesomeIcon icon={faRefresh} />
          <span>Restart</span>
        </button>

        <button>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
    </div>
  );
};

export default TypingHeader;
