import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./app";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);