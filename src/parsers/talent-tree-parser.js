import TalentTree from "../models/talent-tree"

export const talentTreeFromJson = (jsonObject = new TalentTree()) => {
  const result = new TalentTree();

  result.setAscensionAttribute(jsonObject._ascensionAttribute)

  return result;
}
