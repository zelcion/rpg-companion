import CharacterData from "./models/character";
import { observable } from "mobx"

export const store = observable({
  character: new CharacterData(),
});
