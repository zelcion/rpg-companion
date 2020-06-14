import { MersenneTwister } from '../lib/mersenne-twister';

export class Dice {
  rollD(sides) {  
    if (sides === 0) return 0;

    const random = new MersenneTwister().random;
    return Math.max(Math.ceil(random() * sides), 1);
  }
}