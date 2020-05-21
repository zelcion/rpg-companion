import { parseFromJson } from "./character-parser";
import { activeValuesFromJson } from "./active-values-parser";

export const fromStoreJson = (jsonString) => {
  const parsedJson = JSON.parse(jsonString);

  const result = {
    character: parseFromJson(parsedJson.character),
    activeValues: activeValuesFromJson(parsedJson.activeValues),
  }

  console.log(result);

  return result;
}