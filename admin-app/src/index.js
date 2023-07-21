/**
 * * title: main index js file
 * * description: This is the main index js file
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//importing provider to recognize the redux library our app component
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";

//saving store to the browser window
window.store = store;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //adding the store as argument to the provider
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
);
