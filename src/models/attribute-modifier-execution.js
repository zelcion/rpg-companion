import { decorate, action, computed, observable } from "mobx"
import { modifiableAttributes } from "../enums/attribute-modifier-constants";

class AttributeModifierExecution {
  constructor () {
    this.attributeModifierLists = new Map();
    this.unappliedModifiers = [];

    this._init();
    this.removeUnappliedModifier = this.removeUnappliedModifier.bind(this);
    this.addUnappliedModifier = this.addUnappliedModifier.bind(this);
  }

  applyModifier (modifier) {
    this.removeUnappliedModifier(modifier);
    this.addModifier(modifier);
    modifier.applied = true;
  }

  unapplyModifier (modifier) {
    this.removeModifier(modifier);
    this.addUnappliedModifier(modifier);
    modifier.applied = false;
  }

  get appliedAmount () {
    let count = 0;
    this.attributeModifierLists.forEach((attributeModifierList) => {
      count += attributeModifierList.length;
    })

    return count;
  }

  get amount () {
    let count = 0;
    this.attributeModifierLists.forEach((attributeModifierList) => {
      count += attributeModifierList.length;
    })

    return count + this.unappliedModifiers.length;
  }

  get allAppliedModifiers () {
    const resultList = [];

    this.attributeModifierLists.forEach((list) => {
      list.forEach((modifier) => {
        resultList.push(modifier);
      });
    });

    return resultList;
  } 

  _init() {
    Object.keys(modifiableAttributes).forEach((attribute) => {
      this.attributeModifierLists.set(attribute, observable([]));
    });
  }

  addUnappliedModifier(modifier) {
    this.unappliedModifiers.push(modifier);
  }

  removeUnappliedModifier(modifier) {
    const index = this.unappliedModifiers.findIndex((addedModifier) => {
      return addedModifier.id === modifier.id;
    });

    if (index === -1) return;
    this.unappliedModifiers.splice(index, 1);
  }

  addModifier(modifier) {
    const modifierList = this.attributeModifierLists.get(modifier.attribute);
    modifierList.push(modifier);
  }

  removeModifier(modifier) {
    const modifierList = this.attributeModifierLists.get(modifier.attribute);

    if (modifierList === undefined) return;

    const index = modifierList.findIndex((addedModifier) => {
      return addedModifier.id === modifier.id;
    });

    if (index === -1) return;

    modifierList.splice(index, 1);
  }

  getAttributeModificator(attributeName, currentValue) {
    const modifierList = this.attributeModifierLists.get(attributeName);
    let result = currentValue || 0;

    if (modifierList.length === 0) return result;

    const sortedModifiers = this.pushMultipliersToEnd(modifierList);

    sortedModifiers.forEach((modifier) => {
      result = modifier.apply(result)
    });

    return result;
  }

  pushMultipliersToEnd(modifierList) {
    const multipliers = []
    const buffsAndDebuffs = [];

    modifierList.forEach((modifier) => {
      if (modifier.type === "multiplier") {
        multipliers.push(modifier);
        return;
      }

      buffsAndDebuffs.push(modifier);
    })

    return [...buffsAndDebuffs, ...multipliers];
  }
}

export default decorate(AttributeModifierExecution, {
  attributeModifierLists: observable,
  addModifier: action,
  removeModifier: action,
  addUnappliedModifier: action,
  removeUnappliedModifier: action,
  unappliedModifiers: observable,
  amount: computed,
  applyModifier: action,
  unapplyModifier: action,
  appliedAmount: computed,
  allAppliedModifiers: computed,
});
