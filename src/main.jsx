import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TypingProvider } from "./contexts/TypingContext";
import { BrowserRouter } from "react-router-dom";

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
