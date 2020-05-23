import { decorate, action } from "mobx"
import { modifiableAttributes, modifierTypes } from "../enums/attribute-modifier-constants";
import AttributeModifier from "./attribute-modifier";

class AttributeModifierExecution {
  constructor () {
    this.modifiers = new Map();

    this._init();
  }

  _init() {
    Object.keys(modifiableAttributes).forEach((attribute) => {
      this.modifiers.set(attribute, []);
    });
  }

  addModifier(modifier) {
    const modifierList = this.modifiers.get(modifier.attribute);
    modifierList.push(modifier);
  }

  removeModifier(modifier) {
    const modifierList = this.modifiers.get(modifier.attribute);
    const index = modifierList.findIndex((addedModifier) => {
      return addedModifier.id === modifier.id;
    });

    if (index === -1) return;

    modifierList.splice(index, 1);
  }

  getAttribute(attributeName, value) {
    const modifierList = this.modifiers.get(attributeName);

    if (modifierList.length === 0) return value;

    let result = value;
    modifierList.forEach((modifier) => {
      result = modifier.apply(result)
    });

    return result;
  }
}

export default decorate(AttributeModifierExecution, {
  addModifier: action,
  removeModifier: action,
});
