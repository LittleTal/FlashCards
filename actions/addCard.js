export const ADD_CARD = "ADD_CARD";

export function addCard(id, card) {
  return {
    type: ADD_CARD,
    id,
    card
  };
}
