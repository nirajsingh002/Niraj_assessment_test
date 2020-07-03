import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./jss/reusables/styles/reset.css";
import "./jss/reusables/styles/grid.css";
import App from "./components/App";

import store, { history } from './store';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("container")
);
