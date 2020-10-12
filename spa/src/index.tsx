import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import ScrollToTop from "./StoreToTop";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import dateFnsLocalizer from "react-widgets-date-fns";
new dateFnsLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);
