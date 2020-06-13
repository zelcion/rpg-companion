import { Dice } from "../models/dice";
import { store } from "../store";
import { attributeBonusCalc } from "../helpers/attribute-bonus";
import { observable, decorate } from "mobx";

// Abstract class
class SkillUsage {
  constructor (skill) {
    this.skill = skill;
    this.critThreshold = 0.95; // percentage // TODO -> Get value from store
    this.inUse = false;
    this.cost = 0;
    this.effectiveness = 0;
    this.resultingValue = 0;
  }

  // Abstract
  startUsage() { }

  // Abstract
  addRound() { }

  // Abstract
  endUsage() { }

  // Abstract
  message () { }

  // Concrete
  getEffectiveness(cost, critical) {
    const critMultiplier = critical ? 2 : 1;
    return (cost + attributeBonusCalc(store.character.getModifiedAttribute("hability"))) * critMultiplier;
  }

  // Concrete
  getDamage() {
    if (this.skill.type !== "attack") return 0;

    const dice = new Dice();
    const maxRoll = store.character.getModifiedAttribute(this.skill.auxiliaryAttribute);
    const roll = dice.rollD(maxRoll);
    let attackCritical = false

    if (roll > maxRoll * this.critThreshold) {
      attackCritical = true;
    }

    const critMultiplier = attackCritical ? 2 : 1;

    const result = {
      dice: maxRoll,
      roll,
      attackCritical,
      result: Math.ceil((roll + attributeBonusCalc(maxRoll)) * critMultiplier),
    };

    return result;
  }

  // Concrete
  getCost () {
    const dice = new Dice();
    const maxRoll = 4;
    const roll = dice.rollD(maxRoll);

    let usageCritical = false;

    if (roll >= 4) {
      usageCritical = true;
    }

    const result = {
      dice: maxRoll,
      roll,
      usageCritical,
      result: roll + this.skill.level,
    };

    return result;
  }

  // Concrete -- To append in the message the crit of the skill
  critText(costCritical, attackCritical) {
    const magicCrit = "_Crítico Mágico!_";
    const attributeCrit = "_Crítico de Atributo!_";

    const completeCrit = "_CRÍTICO COMPLETO!_";

    if (costCritical && this.skill.type !== "attack") return "_CRÍTICO!_"

    if (costCritical && attackCritical) return completeCrit;

    if (attackCritical) return attributeCrit;

    if (costCritical) return magicCrit;

    return "";
  }

  // Concrete -- To get the text of the damage roll
  damageDicePhrase (damageDice, damageRoll) {
    if (this.skill.type !== "attack") return "";

    return `Rolagem de Dano d${damageDice}[${damageRoll}]`;
  }

}

export default decorate(SkillUsage, {
  inUse: observable,
  cost: observable,
  effectiveness: observable,
  resultingValue: observable,
})
