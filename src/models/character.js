import { attributeFactory } from "./attribute";
import { decorate, observable, action } from "mobx"

export class CharacterData {
  constructor() {
    this.name = "Nome do Jogador";
    this.level = 0;

    this.strength = 0;
    this.constitution = 0;
    this.dexterity = 0;
    this.wisdom = 0;
    this.intelligence = 0;
    this.charisma = 0;
    this.hability = 0;

    this.skills = [];

    this.incrementAttribute = this.incrementAttribute.bind(this);
    this.decrementAttribute = this.decrementAttribute.bind(this);
  }

  getBonus(attribute) {
    return ((this[attribute] - 10) - this[attribute] % 2) / 2
  }

  get attributeIterable () {
    return [
      attributeFactory("strength", this),
      attributeFactory("constitution", this),
      attributeFactory("dexterity", this),
      attributeFactory("wisdom", this),
      attributeFactory("intelligence", this),
      attributeFactory("charisma", this),
      attributeFactory("hability", this),
    ]
  }

  incrementAttribute(attribute) {
    this[attribute] += 1;
  }

  decrementAttribute(attribute) {
    this[attribute] -= 1;
  }

  removeSkill (key) {
    const index = this.skills.findIndex((skill) => skill.key === key);

    this.skills.splice(index, 1);
  }

  addSkill(skill) {
    this.skills.push(skill);
  }
}

export default decorate(CharacterData, {
  strength: observable,
  constitution: observable,
  dexterity: observable,
  wisdom: observable,
  intelligence: observable,
  charisma: observable,
  hability: observable,
  level: observable,
  skills: observable,
  name: observable,

  incrementAttribute: action,
  decrementAttribute: action,
  addSkill: action,
  removeSkill: action,
})
