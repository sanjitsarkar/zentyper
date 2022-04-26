import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TypingProvider } from "./contexts/TypingContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TypingProvider>
        <App />
      </TypingProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
