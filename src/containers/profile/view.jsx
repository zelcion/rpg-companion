import React from "react";
import { store } from "../../store.js";
import { Character } from "../../components/character.jsx";
import { WebhookInput } from "../../components/webhook-input";
import { useCharacterEdit } from "./actions.js";

const ProfileView = (props) => {
  const [renameCharacter, exportCharacter, importCharacter] = useCharacterEdit(props);

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

export default ProfileView;
