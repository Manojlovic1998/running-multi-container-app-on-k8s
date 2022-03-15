import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigation />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("header")
);

ReactDOM.render(<App />, document.getElementById("main"));

reportWebVitals();
