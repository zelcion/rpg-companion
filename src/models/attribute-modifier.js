import { decorate, observable, computed } from "mobx"
import { modifierApplier } from "../enums/attribute-modifier-constants";

class AttributeModifier {
  constructor () {
    this._id = Math.ceil(Math.random() * 1000000000);
    this.name = "";
    this.type = "";
    this.amount = 0;
    this.attribute = "";
    this.description = "";
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
})
