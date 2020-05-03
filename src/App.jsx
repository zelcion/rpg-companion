
import React from "react";
import { Character } from "./components/character.jsx";
import { hot } from 'react-hot-loader/root';
import { observer } from "mobx-react"
import { parseFromJson } from "./parsers/character-parser";

const ObApp = observer(class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      character: this.props.character,
      imported: false,
    }

    this.renameCharacter = this.renameCharacter.bind(this);
    this.exportCharacter = this.exportCharacter.bind(this);
    this.importCharacter = this.importCharacter.bind(this);
  }

  renameCharacter () {
    const newName = window.prompt("Nome", "personagem");

    this.props.character.name = newName;
  }

  exportCharacter () {
    console.log("Exporting Character");
    const file = new Blob([JSON.stringify(this.state.character, null, 2)], {
      type: "application/JSON"
    });
    const filename = `${this.state.character.name}_sheet.json`;

    console.log("character exported: ", JSON.stringify(this.state.character, null, 2));

    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  importCharacter () {
    console.log("Importing Character");

    var input = document.createElement("input");
    input.type = "file";
    input.accept = "application/JSON"
    input.className = "no-display";
    document.body.appendChild(input);

    input.addEventListener("change", (ev) => {
      const reader = new FileReader();
      reader.readAsText(ev.target.files[0], "character");

      reader.addEventListener("load", (content) => {
        const result = parseFromJson(content.target.result);
        this.setState({ character: result });
        this.setState({ imported: true });
        this.state.character.name = result.name;
      })
    });
    input.click();


  }

  render() {
    if (this.state.imported) console.log("imported successfully");

    return (
      <div>
        <div id="button-container">
          <button className="main-button" onClick={this.renameCharacter}> Renomear personagem </button>
          <button className="main-button" onClick={this.exportCharacter}> exportar </button>
          <button className="main-button" onClick={this.importCharacter}> importar </button>
        </div>
        <hr />
        <Character character={this.state.character}  />
      </div>
    )
  }
})

export default hot(ObApp);
