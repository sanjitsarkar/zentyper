import { Route, Routes } from "react-router-dom";
import "./App.css";
import TypingPractice from "./pages/TypingPractice";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TypingPractice />} />
    </Routes>
  );
}

export default App;
