import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import TypingPractice from "./pages/TypingPractice";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/practice" element={<TypingPractice />} />
    </Routes>
  );
}

export default App;
