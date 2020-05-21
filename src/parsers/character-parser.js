import CharacterData from "../models/character";
import Skill from "../models/skill";

export const parseFromJson = (jsonObject) => {
  const parsedChar = new CharacterData();

  parsedChar.strength = jsonObject.strength;
  parsedChar.constitution = jsonObject.constitution;
  parsedChar.dexterity = jsonObject.dexterity;
  parsedChar.wisdom = jsonObject.wisdom;
  parsedChar.intelligence = jsonObject.intelligence;
  parsedChar.charisma = jsonObject.charisma;
  parsedChar.hability = jsonObject.hability;
  parsedChar.level = jsonObject.level;
  parsedChar.name = jsonObject.name;

  parsedChar.skills = jsonObject.skills.map((skill) => {
    const currentSkill = new Skill();

    currentSkill.name = skill.name;
    currentSkill.size = skill.size;
    currentSkill.auxiliaryAttribute = skill.auxiliaryAttribute;
    currentSkill.type = skill.type;
    currentSkill.description = skill.description;
    currentSkill.effects = skill.effects;
    currentSkill.activation = skill.activation;
    currentSkill.range = skill.range;
    currentSkill.level = skill.level;

    return currentSkill;
  });

  return parsedChar;
}
