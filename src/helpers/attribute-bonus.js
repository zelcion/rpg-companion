export const attributeBonusCalc = (value) => {
  return ((value - 10) - value % 2) / 2
}