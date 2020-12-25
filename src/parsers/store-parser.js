import { parseFromJson } from "./character-parser";
import { activeValuesFromJson } from "./active-values-parser";
import { modifiersFromJson } from "./modifiers-parser";
import { talentTreeFromJson } from "./talent-tree-parser";

export const fromStoreJson = (jsonString) => {
  const parsedJson = JSON.parse(jsonString);

  const result = {
    character: parseFromJson(parsedJson.character),
    activeValues: activeValuesFromJson(parsedJson.activeValues),
    modifiers: modifiersFromJson(parsedJson.modifiers),
    talentTree: talentTreeFromJson(parsedJson.talentTree),
    webhookUrl: parsedJson.webhookUrl,
  }

  console.log(result);

  return result;
}