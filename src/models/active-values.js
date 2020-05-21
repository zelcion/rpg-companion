import { decorate, observable, action } from "mobx"

class ActiveValues {
  constructor () {
    this.maxLife = 0;
    this.maxEnergy = 0;
    this.currentLife = 0;
    this.currentEnergy = 0;

    this.armorClass = 0;

    this.partialRest = this.partialRest.bind(this);
    this.fullRest = this.fullRest.bind(this);
  }

  partialRest () {
    const lifeRegen = Math.ceil(this.maxLife / 2);
    const energyRegen = Math.ceil(this.maxEnergy / 2);

    this.currentLife += lifeRegen;
    this.currentEnergy += energyRegen;

    this.correctValues();
  }

  fullRest () {
    this.currentEnergy = this.maxEnergy;
    this.currentLife = this.maxLife;

    this.correctValues();
  }

  correctValues () {
    if (this.currentLife > this.maxLife) {
      this.currentLife = this.maxLife;
    }

    if (this.currentEnergy > this.maxEnergy) {
      this.currentEnergy = this.maxEnergy;
    }


    if (this.currentLife < 0) {
      this.currentLife = 0;
    }

    if (this.currentEnergy < 0) {
      this.currentEnergy = 0;
    }
  }

  increaseValue (valueName, amount) {
    this[valueName] += amount;

    this.correctValues();
  }

  decreaseValue (valueName, amount) {
    this[valueName] -= amount;

    this.correctValues();
  }
}

export default decorate(ActiveValues, {
  maxLife: observable,
  maxEnergy: observable,
  currentLife: observable,
  currentEnergy: observable,
  armorClass: observable,

  partialRest: action,
  fullRest: action,
  increaseValue: action,
  decreaseValue: action,
})