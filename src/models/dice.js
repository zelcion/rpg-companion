const MersenneTwister = require('mersenne-twister');

export class Dice {
  rollD(sides) {
    const random = new MersenneTwister().random;
    return Math.max(Math.ceil(random() * sides), 1);
  }
}