import { decorate, observable, action, computed } from "mobx"
import { store } from "../store";
import { attributeBonusCalc } from "../helpers/attribute-bonus";

class ActiveValues {
  constructor () {
    this.maxEnergy = 0;
    this.currentLife = 0;
    this.currentEnergy = 0;
    this.currentMoney = 0;
    this.classBaseLife = 8;

    this.partialRest = this.partialRest.bind(this);
    this.fullRest = this.fullRest.bind(this);
  }

  get modifiedMaxLife () {
    return store.modifiers.getAttributeModificator("maximumLife") + this.maxLife;
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

  partialRest () {
    const maxLife = store.modifiers.getAttributeModificator("maximumLife") + this.maxLife;

    const lifeRegen = Math.ceil(maxLife / 2);
    const energyRegen = Math.ceil(this.maxEnergy / 2);

    this.currentLife += lifeRegen;
    this.currentEnergy += energyRegen;

    this.correctValues();
  }

  fullRest () {
    this.currentEnergy = this.maxEnergy;
    this.currentLife = this.modifiedMaxLife;

    this.correctValues();
  }

  correctValues () {
    if (this.currentLife > this.modifiedMaxLife) {
      this.currentLife = this.modifiedMaxLife;
    }

    if (this.currentEnergy > this.maxEnergy) {
      this.currentEnergy = this.maxEnergy;
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
  maxEnergy: observable,
  currentLife: observable,
  currentEnergy: observable,
  currentMoney: observable,
  armorClass: computed,
  modifiedMaxLife: computed,
  classBaseLife: observable,

  partialRest: action,
  fullRest: action,
  increaseValue: action,
  decreaseValue: action,
})