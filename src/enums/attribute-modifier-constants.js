import { store } from "../store";

export const modifierClasses = {
  buff: "mods-buff",
  debuff: "mods-debuff",
};

export const modifierSymbols = {
  buff: "+",
  debuff: "-",
};

export const modifierLogic = {
  buff: (current, amount) => current + amount,
  debuff: (current, amount) => current - amount,
  // multiplier: "multiplier" // Disabled for now
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
};

export const modifierApplier = (type, current, amount) => {
  return modifierLogic[type](current, amount);
};

export const modificationFunctions = {
  strength: (amount, type) =>
    modifierApplier(type, store.character.strength, amount),
  constitution: (amount, type) =>
    modifierApplier(type, store.character.constitution, amount),
  dexterity: (amount, type) =>
    modifierApplier(type, store.character.dexterity, amount),
  wisdom: (amount, type) =>
    modifierApplier(type, store.character.wisdom, amount),
  intelligence: (amount, type) =>
    modifierApplier(type, store.character.intelligence, amount),
  charisma: (amount, type) =>
    modifierApplier(type, store.character.charisma, amount),
  hability: (amount, type) =>
    modifierApplier(type, store.character.hability, amount),
  maximumLife: (amount, type) =>
    modifierApplier(type, store.activeValues.maxLife, amount),
  maximumEnergy: (amount, type) =>
    modifierApplier(type, store.activeValues.maxEnergy, amount),
  armorClass: (amount, type) =>
    modifierApplier(type, store.activeValues.armorClass, amount),
};
