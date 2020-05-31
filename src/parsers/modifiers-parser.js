import AttributeModifierExecution from "../models/attribute-modifier-execution";
import AttributeModifier from "../models/attribute-modifier";

export const modifiersFromJson = (jsonObject) => {
  console.log(jsonObject)

  const modifierExecution = new AttributeModifierExecution();

  Object.keys(jsonObject.attributeModifierLists).forEach((key) => {
    const list = jsonObject.attributeModifierLists[key];

    const modifiersList = list.map((jsonModifier) => {
      const modifier = new AttributeModifier();

      modifier.id = jsonModifier.id
      modifier.name = jsonModifier.name;
      modifier.type = jsonModifier.type;
      modifier.amount = jsonModifier.amount;
      modifier.attribute = jsonModifier.attribute;
      modifier.description = jsonModifier.description;
      modifier.applied = jsonModifier.applied;
    });

    modifierExecution.attributeModifierLists.set(key, modifiersList);
  });

  jsonObject.unappliedModifiers.forEach((jsonModifier) => {
    const modifier = new AttributeModifier();

    modifier.id = jsonModifier.id
    modifier.name = jsonModifier.name;
    modifier.type = jsonModifier.type;
    modifier.amount = jsonModifier.amount;
    modifier.attribute = jsonModifier.attribute;
    modifier.description = jsonModifier.description;
    modifier.applied = jsonModifier.applied;

    modifierExecution.unappliedModifiers.push(modifier);
  });

  console.log(modifierExecution);

  return modifierExecution;
}