import SelfActivationSkillUsage from "../actions/skill-strategies/self-activation";
import SkillUsage from "../actions/skill-usage";
import ToggleActivationSkillUsage from "../actions/skill-strategies/toggle-activation";
import ChargeActivationSkillUsage from "../actions/skill-strategies/charge-activation";
import TrapActivationSkillUsage from "../actions/skill-strategies/trap-activation";

export const skillAlgorithms = Object.freeze({
  "": SkillUsage, // Default - Just for wen the skill is not set yet, or was just created.
  "self": SelfActivationSkillUsage,
  "toggle": ToggleActivationSkillUsage,
  "charge": ChargeActivationSkillUsage,
  "trap": TrapActivationSkillUsage
});