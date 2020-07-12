import ActiveValues from "../models/active-values";

export const activeValuesFromJson = (jsonObject) => {
  const result = new ActiveValues();
  result.maxEnergy = jsonObject.maxEnergy;
  result.currentMoney = Number(jsonObject.currentMoney) || 0;
  result.currentLife = jsonObject.currentLife;
  result.currentEnergy = jsonObject.currentEnergy;
  result.classBaseLife = jsonObject.classBaseLife;

  return result;
}