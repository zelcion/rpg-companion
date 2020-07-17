import { decorate, observable } from "mobx";
import {
  modifiableAttributes,
  modifierApplier,
  modifierLogic,
} from "../enums/attribute-modifier-constants";

class AttributeModifier {
  constructor() {
    this.id = Math.ceil(Math.random() * 1000000000);
    this.name = "";
    this.type = "";
    this.amount = 0;
    this.attribute = "";
    this.description = "";
    this.applied = false;

    this.isApplyable = this.isAppliable.bind(this);
  }

  hasName() {
    return this.name !== "name" && this.name !== "";
  }

  hasModifiableAttribute() {
    return modifiableAttributes[this.attribute] !== undefined;
  }

  hasModifierLogic() {
    return modifierLogic[this.type] !== undefined;
  }

  isAppliable() {
    return (
      this.hasName() && this.hasModifiableAttribute() && this.hasModifierLogic()
    );
  }

  apply(value) {
    return modifierApplier(this.type, value, this.amount);
  }
}

export default decorate(AttributeModifier, {
  name: observable,
  type: observable,
  amount: observable,
  attribute: observable,
  description: observable,
  applied: observable,
});
