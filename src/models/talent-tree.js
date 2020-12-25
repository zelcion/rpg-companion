import { action, computed, decorate, observable } from "mobx";

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

    const result = validValues.includes(value) ? value : validValues[0];

    this._ascensionAttribute = result;
  }
}

export default decorate(TalentTree, {
  ascensionAttribute: computed,
  setAscensionAttribute: action,
  _ascensionAttribute: observable,
})