import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Keyboard from "./components/Keyboard";
import TypingPractice from "./pages/TypingPractice";

function App() {
  return (
    <div className="App">
      <TypingPractice />
    </div>
  );
}

export default App;
