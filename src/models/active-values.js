import { decorate, observable, action, computed } from "mobx"
import { store } from "../store";
import { attributeBonusCalc } from "../helpers/attribute-bonus";

class ActiveValues {
  constructor () {
    this.currentLife = 0;
    this.currentEnergy = 0;
    this.currentMoney = 0;
    this.classBaseLife = 8;
    this.classBaseEnergy = 6;

    this.partialRest = this.partialRest.bind(this);
    this.fullRest = this.fullRest.bind(this);
  }

  get modifiedMaxLife () {
    return store.modifiers.getAttributeModificator("maximumLife") + this.maxLife;
  }

  get modifiedMaxEnergy () {
    return store.modifiers.getAttributeModificator("maximumEnergy") + this.maxEnergy;
  }

  get armorClass () {
    const baseCA = (store.character.level * 2) + 10;
    const dexCA = attributeBonusCalc(store.character.getModifiedAttribute("dexterity")) * store.character.level;

    return baseCA + dexCA;
  }

  get maxLife () {
    const characterConstitution = store.character.getModifiedAttribute("constitution");
    const constitutionMultiplier = attributeBonusCalc(characterConstitution) + store.character.level;
    const baseLife = (10 + this.classBaseLife) * store.character.level;
    const levelLife = store.character.level * constitutionMultiplier;
    const constituitionLife = (characterConstitution + attributeBonusCalc(characterConstitution)) * store.character.level;
  
    return baseLife + levelLife + constituitionLife;
  }

  get maxEnergy () {
    const lowLevelEnergyDropoff = Math.max(12 - store.character.level, 0);

    const characterHability = store.character.getModifiedAttribute("hability");
    const multiplier = store.character.level + this.classBaseEnergy - 2;
    const habilityBonus = attributeBonusCalc(characterHability);

    const result = habilityBonus * multiplier + lowLevelEnergyDropoff;

    return Math.max(result, 0);
  }

  partialRest () {
    const lifeRegen = Math.ceil(this.modifiedMaxLife / 2);
    const energyRegen = Math.ceil(this.modifiedMaxEnergy / 2);

    this.currentLife += lifeRegen;
    this.currentEnergy += energyRegen;

    this.correctValues();
  }

  fullRest () {
    this.currentEnergy = this.modifiedMaxEnergy;
    this.currentLife = this.modifiedMaxLife;

    this.correctValues();
  }

  correctValues () {
    if (this.currentLife > this.modifiedMaxLife) {
      this.currentLife = this.modifiedMaxLife;
    }

    if (this.currentEnergy > this.modifiedMaxEnergy) {
      this.currentEnergy = this.modifiedMaxEnergy;
    }
  }

  increaseValue (valueName, amount) {
    this[valueName] += amount;

    this.correctValues();
  }

  decreaseValue (valueName, amount) {
    this[valueName] = Math.max(0, this[valueName] - amount);
  }
}

export default decorate(ActiveValues, {
  maxLife: computed,
  maxEnergy: computed,
  currentLife: observable,
  currentEnergy: observable,
  currentMoney: observable,
  armorClass: computed,
  modifiedMaxLife: computed,
  modifiedMaxEnergy: computed,
  classBaseLife: observable,
  classBaseEnergy: observable,

  partialRest: action,
  fullRest: action,
  increaseValue: action,
  decreaseValue: action,
})