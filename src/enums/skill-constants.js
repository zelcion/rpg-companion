export const validAttributes = [
  "strength",
  "constitution",
  "dexterity",
  "wisdom",
  "intelligence",
  "charisma",
  "hability"
]

export const validActivations = [
  "self", "toggle", "charge", "trap"
]

export const validTypes = [
  "attack", "buff", "debuff", "util"
]

export const validEffects = [
  "DoT", "stun", "vulnerability", "silence", "disarm"
]

export const effectsDamageMultiplier = {
  "DoT": 0.92,
  "stun": 0.8,
  "vulnerability": 0.88,
  "silence": 0.9,
  "disarm": 0.9
}

export const levelDamageMultiplier = {
  0: 1,
  1: 1.1,
  2: 1.2,
  3: 1.3,
  4: 1.4,
  5: 1.5,
  6: 1.6,
  7: 1.7,
  8: 1.8,
  9: 1.9
}