import CharacterData from "./models/character";
import ActiveValues from "./models/active-values"
import { observable } from "mobx"
import AttributeModifierExecution from "./models/attribute-modifier-execution";

export const store = observable({
  character: new CharacterData(),
  activeValues: new ActiveValues(),
  modifiers: new AttributeModifierExecution(),
  webhookUrl: "",
});
