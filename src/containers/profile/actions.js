import { store } from "../../store.js";
import { fromStoreJson } from "../../parsers/store-parser";

// We can substitute these actions for React Hooks

export const renameCharacter = () => {
  const newName = window.prompt("Nome", "personagem");

  store.character.name = newName;
}
  
export const exportCharacter = () => {
  console.log("Exporting Character");
  const file = new Blob([JSON.stringify(store, null, 2)], {
    type: "application/JSON"
  });
  const filename = `${store.character.name}_sheet.json`;

  console.log("character exported: ", JSON.stringify(store.character, null, 2));

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
  
export const importCharacter = () => {
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
      const result = fromStoreJson(content.target.result);
      store.character = result.character;
      store.activeValues = result.activeValues;
      store.modifiers = result.modifiers;
    })
  });
  input.click();
}
