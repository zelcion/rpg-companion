import SkillUsage from "../skill-usage";
import { decorate, action } from "mobx";
import { store } from "../../store";
import { levelDamageMultiplier } from "../../enums/skill-constants";

export class SelfActivationSkillUsage extends SkillUsage {
  constructor(skill) {
    super(skill);

    this.damage = 0;

    this.startUsage = this.startUsage.bind(this);
    this.endUsage = this.endUsage.bind(this);
    this.message = this.message.bind(this);
  }

  startUsage() {
    if (this.inUse) return;

    this.inUse = true;

    const costDetails = this.getCost();

    this.cost = costDetails.result;
    this.costRoll = costDetails.roll;
    this.costCritical = costDetails.usageCritical;
    this.effectiveness = this.getEffectiveness(this.cost, costDetails.usageCritical);

    if (this.skill.type !== "attack") { return; }

    const damageDetails = this.getDamage();

    this.damage = damageDetails.result;
    this.damageDice = damageDetails.dice;
    this.damageRoll = damageDetails.roll;
    this.attackCritical = damageDetails.attackCritical;
  }

  addRound() { return; }
  
  endUsage() { 
    store.activeValues.decreaseValue("currentEnergy", this.cost);
    
    const trueResult = (this.damage + this.effectiveness) * levelDamageMultiplier[this.skill.level];

    this.resultingValue = Math.max(Math.ceil(trueResult), 0);

    this.inUse = false;
  }
  
  message () {
    const critText = this.critText(this.costCritical, this.attackCritical);

    const title = `**${store.character.name}** usou **${this.skill.name}** (lvl.${this.skill.level})! ${critText}`
    const habilityDice = `Rolagem de Habilidade d4[${this.costRoll}]`;
    const damageDice = this.damageDicePhrase(this.damageDice, this.damageRoll);
    const cost = `> Custo: ${this.cost}`;
    const finalValue = `> Resultado: **${this.resultingValue}**`;
    const text = this.skill.description.replace("@resultado", `**${this.resultingValue}**`);
    
    return `${title}\n${cost}\n${finalValue}\n> Descrição: ${text} \n ------------ \n ${habilityDice} \n ${damageDice}`
  }
}

export default decorate(SelfActivationSkillUsage, {
  startUsage: action,
  endUsage: action,
})