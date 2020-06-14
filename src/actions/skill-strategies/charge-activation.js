import SkillUsage from "../skill-usage";
import { decorate, action, observable } from "mobx";
import { store } from "../../store";
import { levelDamageMultiplier } from "../../enums/skill-constants";

export class ChargeActivationSkillUsage extends SkillUsage {
  constructor(skill) {
    super(skill);

    this.damage = 0;
    this.rounds = 0;
    this.totalCost = 0;

    this.startUsage = this.startUsage.bind(this);
    this.addRound = this.addRound.bind(this);
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

  addRound() {
    this.rounds += 1;

    const calculatedEffectiveness = this.effectiveness * this.rounds;
    const trueResult = (this.damage + calculatedEffectiveness) * levelDamageMultiplier[this.skill.level];
    this.resultingValue = Math.max(Math.ceil(trueResult), 0);

    this.totalCost = this.cost * this.rounds;
  }
  
  endUsage() {
    store.activeValues.decreaseValue("currentEnergy", this.totalCost); 
    this.inUse = false;
  }

  message () {
    const critText = this.critText(this.costCritical, this.attackCritical);

    const title = `**${store.character.name}** terminou de carregar **${this.skill.name}** (lvl.${this.skill.level})! ${critText}`
    const habilityDice = `Rolagem de Habilidade d4[${this.costRoll}]`;
    const damageDice = this.damageDicePhrase(this.damageDice, this.damageRoll);
    const cost = `> Custo final: ${this.cost * this.rounds} (${this.cost} por ${this.rounds} turnos)`;
    const finalValue = `> Resultado final: **${this.resultingValue}**`;
    const text = this.skill.description.replace("@resultado", `**${this.resultingValue}**`);
    
    return `${title}\n${cost}\n${finalValue}\n> Descrição: ${text} \n ------------ \n ${habilityDice} \n ${damageDice}`
  }
}

export default decorate(ChargeActivationSkillUsage, {
  startUsage: action,
  addRound: action,
  endUsage: action,
  rounds: observable,
  totalCost: observable,
})