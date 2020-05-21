import ActiveValues from "../models/active-values";

export const activeValuesFromJson = (jsonObject) => {
  const result = new ActiveValues();
  result.maxLife = jsonObject.maxLife;
  result.maxEnergy = jsonObject.maxEnergy;
  result.currentLife = jsonObject.currentLife;
  result.currentEnergy = jsonObject.currentEnergy;
  result.armorClass = jsonObject.armorClass;

  return result;
}