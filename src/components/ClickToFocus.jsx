import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTyping } from "../contexts/TypingContext";

const ClickToFocus = () => {
  const { setIsBlur } = useTyping();
  return (
    <div
      className="z-50 absolute t-0 l-0 r-0 text-white w-screen h-screen bg-slate-900 opacity-90 grid place-content-center backdrop-blur-3xl"
      onClick={() => setIsBlur(false)}
    >
      <h1 className="text-2xl">
        <FontAwesomeIcon
          icon={faArrowPointer}
          className="mr-3 text-green-600"
        />
        <span>Click or press any key to focus</span>
      </h1>
    </div>
  );
};

export default ClickToFocus;
