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
  0: 0.85,
  1: 1,
  2: 1.10,
  3: 1.20,
  4: 1.30,
  5: 1.40,
  6: 1.50,
  7: 1.60,
  8: 1.70,
  9: 1.80
}