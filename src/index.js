import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./styles.css";
import CharacterData from "./models/character";


var mountNode = document.getElementById("app");
ReactDOM.render(<App character={new CharacterData()} />, mountNode);
