import { decorate, observable } from "mobx"
import { modifierApplier, modifiableAttributes, modifierTypes } from "../enums/attribute-modifier-constants";

class AttributeModifier {
  constructor () {
    this.id = Math.ceil(Math.random() * 1000000000);
    this.name = "";
    this.type = "";
    this.amount = 0;
    this.attribute = "";
    this.description = "";
    this.applied = false;

    this.isApplyable = this.isAppliable.bind(this);
  }

  isAppliable () {
    if (this.name === "name" || this.name === "") return false;
    if (modifiableAttributes[this.attribute] === undefined) return false;
    if (modifierTypes[this.type] === undefined) return false;
    
    return true;
  }

  apply (value) {
    return modifierApplier(this.type, value, this.amount);
  }
}

export default decorate(AttributeModifier, {
  name: observable,
  type: observable,
  amount: observable,
  attribute: observable,
  description: observable,
  applied: observable
})
