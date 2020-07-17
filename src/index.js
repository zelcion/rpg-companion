import React from "react";
import ReactDOM from "react-dom";
import Profile from "./containers/profile";
import "./styles.css";
import { store } from "./store";

var mountNode = document.getElementById("app");

ReactDOM.render(<Profile character={store.character} />, mountNode);

module.hot?.accept("./containers/profile", () => {
  ReactDOM.render(<Profile character={store.character} />, mountNode);
});
