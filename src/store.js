import CharacterData from "./models/character";
import ActiveValues from "./models/active-values"
import { observable } from "mobx"

export const store = observable({
  character: new CharacterData(),
  activeValues: new ActiveValues(),
});
