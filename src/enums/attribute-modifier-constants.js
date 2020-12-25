import { store } from "../store";

export const modifierClasses = {
  buff: "mods-buff",
  debuff: "mods-debuff",
  multiplier: "mods-multiplier"
};

export const modifierSymbols = {
  buff: "+",
  debuff: "-",
  multiplier: "×"
};

export const modifierLogic = {
  buff: (current, amount) => current + amount,
  debuff: (current, amount) => current - amount,
  multiplier: (current, amount) => current * amount,
};

export const modifiableAttributes = {
  // TODO add crit threshold
  strength: "strength",
  constitution: "constitution",
  dexterity: "dexterity",
  wisdom: "wisdom",
  intelligence: "intelligence",
  charisma: "charisma",
  hability: "hability",
  maximumLife: "maximum life",
  maximumEnergy: "maximum energy",
  armorClass: "armor class",
  strengthBonus: "strength bonus",
  constitutionBonus: "constitution bonus",
  dexterityBonus: "dexterity bonus",
  wisdomBonus: "wisdom bonus",
  intelligenceBonus: "intelligence bonus",
  charismaBonus: "charisma bonus",
  habilityBonus: "hability bonus",
};

export const modifierApplier = (type, current, amount) => {
  return modifierLogic[type](current, amount);
};
