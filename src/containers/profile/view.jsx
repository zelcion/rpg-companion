import React from "react";
import { store } from "../../store.js";
import { Character } from "../../components/character.jsx";
import { WebhookInput } from "../../components/webhook-input";
import { renameCharacter, exportCharacter, importCharacter } from "./actions.js";

class ProfileView extends React.PureComponent {
  render () {
    return (
      <div className="app">
        <div id="button-container card">
          <WebhookInput />
          <button className="main-button" onClick={renameCharacter}> Renomear Personagem </button>
          <button className="main-button" onClick={exportCharacter}> Exportar </button>
          <button className="main-button" onClick={importCharacter}> Importar </button>
        </div>
        <Character character={store.character}  />
      </div>
    )
  }
}

export default ProfileView;
