import { action, computed, decorate, observable } from "mobx";
import { store } from "../store";
import AttributeModifier from "./attribute-modifier";

class TalentTree {
  constructor () {
    this._ascensionAttribute = "none"
  }

  get ascensionAttribute () {
    return this._ascensionAttribute;
  }

  setAscensionAttribute (value) {
    const validValues = [
      "none",
      "strength",
      "constitution",
      "dexterity",
      "wisdom",
      "intelligence",
      "charisma",
      "hability"
    ];

    const currentValue = this._ascensionAttribute;
    const result = validValues.includes(value) ? value : validValues[0];
    this._ascensionAttribute = result;
  }

  changeBonusMultiplierAttribute (newAttribute) {
    if (newAttribute === validValues[0]) { return; }

    const newModifier = new AttributeModifier();
    newModifier.name = "Talent Tree - Ascension";
    newModifier.type = "multiplier";
    newModifier.attribute = `${newAttribute}Bonus`;
    newModifier.amount = 2;
    
    store.modifiers.addModifier();
  }
}

export default decorate(TalentTree, {
  ascensionAttribute: computed,
  setAscensionAttribute: action,
  _ascensionAttribute: observable,
});
