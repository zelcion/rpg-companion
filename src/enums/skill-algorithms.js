import SelfActivationSkillUsage from "../actions/skill-strategies/self-activation";
import SkillUsage from "../actions/skill-usage";
import ToggleActivationSkillUsage from "../actions/skill-strategies/toggle-activation";

export const skillAlgorithms = Object.freeze({
  "": SkillUsage, // Default - Just for wen the skill is not set yet.
  "self": SelfActivationSkillUsage,
  "toggle": ToggleActivationSkillUsage
});