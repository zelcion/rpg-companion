import CharacterData from "./models/character";
import ActiveValues from "./models/active-values"
import { observable } from "mobx"
import AttributeModifierExecution from "./models/attribute-modifier-execution";
import TalentTree from "./models/talent-tree";

export const store = observable({
  character: new CharacterData(),
  activeValues: new ActiveValues(),
  modifiers: new AttributeModifierExecution(),
  talentTree: new TalentTree(),
  webhookUrl: "",
});
