import ActiveValues from "../models/active-values";

export const activeValuesFromJson = (jsonObject) => {
  const result = new ActiveValues();
  result.currentMoney = Number(jsonObject.currentMoney) || 0;
  result.currentLife = jsonObject.currentLife;
  result.currentEnergy = jsonObject.currentEnergy;
  result.classBaseLife = jsonObject.classBaseLife;
  result.classBaseEnergy = jsonObject.classBaseEnergy;

  return result;
}