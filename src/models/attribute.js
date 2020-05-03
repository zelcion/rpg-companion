export const attributeFactory = (attributeName, character) => {
  return { name: attributeName, value: character[attributeName], bonus: character.getBonus(attributeName) };
}
