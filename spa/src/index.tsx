import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

import "./style.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import ScrollToTop from "./StoreToTop";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.css";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);
