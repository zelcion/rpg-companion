import { decorate, observable, action } from "mobx";
import { validActivations, validTypes, validAttributes, validEffects, effectsDamageMultiplier } from "../enums/skill-constants";

const dmgSplit = (persons, baseDmg) => {
    return baseDmg / (persons - persons * (0.45));
}

class Skill {
  constructor () {
    this.name = "";
    this.size = 1;
    this.level = 0;
    this.auxiliaryAttribute = "";
    this.type = "";
    this.description = "";
    this.effects = [];
    this.activation = "";
    this.range = 1;

    this.key = Math.floor(Math.random() * 1000000);

    this.pickAttribute = this.pickAttribute.bind(this);
    this.pickType = this.pickType.bind(this);
    this.addEffect = this.addEffect.bind(this);
    this.removeEffect = this.removeEffect.bind(this);
    this.increaseLevel = this.increaseLevel.bind(this);
    this.decreaseLevel = this.decreaseLevel.bind(this);
  }

  pickAttribute (attribute) {
    if (validAttributes.includes(attribute)) {
      this.auxiliaryAttribute = attribute;
    }
  }

  pickType (type) {
    if (validTypes.includes(type)) {
      this.type = type;
    }
  }

  pickActivation (activation) {
    if (validActivations.includes(activation)) {
      this.activation = activation;
    }
  }

  addEffect (effect) {
    if(validEffects.includes(effect)) {
      this.effects.push(effect);
    }
  }

  removeEffect (effect) {
    const index = this.effects.indexOf(effect);

    if (index !== -1) {
      this.effects.splice(index, 1);
    }
  }

  increaseLevel () {
    if (this.level + 1 > 9) return;

    this.level += 1;
  }

  decreaseLevel () {
    if (this.level - 1 < 0) return;

    this.level -= 1;
  }

  getRangeText () {
    let min = 1;
    let max = 100;

    const calcMin = this.range - (this.level * 2);
    const calcMax = this.range + 1 + (this.level * 2);

    const difference = calcMax - calcMin;

    if (calcMax < max) max = calcMax;
    if (calcMin > min) min = calcMin;

    if (max - min < difference) {
      if (min === 1) {
        max = difference;
      }

      if (max === 100) {
        min = 100 - difference;
      }
    }

    return `${min}m - ${max}m`;
  }

  costFormula () {
    return ` 1d4 + ${this.level}`;
  }

  effectivenessFormula (character) {
    return this.costFormula() + ` + ${character.getBonus("hability")}`
  }

  diceFormula (character) {
    const damageFormula = (this.type === "attack")
      ? ` + (1d${(character[this.auxiliaryAttribute] - character[this.auxiliaryAttribute] % 2)} + ${character.getBonus(this.auxiliaryAttribute)}) `
      : "";

    const chargeFormula = this.activation === "charge"
     ? ` x(número de turnos segurados)`
     : "";

    return `(1d4 + ${this.level} + ${character.getBonus("hability")})${chargeFormula} ${damageFormula}`;
  }

  calculateDamage (baseDamage, amountOfTargets, vulnerabilityBoolean) {
    let intermediaryDmg = baseDamage;

    if (amountOfTargets >= 2) {
      intermediaryDmg = dmgSplit(amountOfTargets, baseDamage);
    }

    if (vulnerabilityBoolean) {
      intermediaryDmg = intermediaryDmg * 1.2;
    }

    this.effects.forEach((effect) => {
      intermediaryDmg = intermediaryDmg * effectsDamageMultiplier[effect];
    })

    return Math.floor(intermediaryDmg);
  }
}

export default decorate(Skill, {
  name: observable,
  size: observable,
  range: observable,
  level: observable,
  auxiliaryAttribute: observable,
  type: observable,
  description: observable,
  effects: observable,
  activation: observable,

  pickAttribute: action,
  pickType: action,
  pickActivation: action,
  addEffect: action,
  removeEffect: action,
  increaseLevel: action,
  decreaseLevel: action,
})
