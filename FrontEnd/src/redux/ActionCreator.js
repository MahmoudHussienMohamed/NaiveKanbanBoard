import * as Actions from "./ActionTypes";

export function addCard(stage, id, title = "", description = "") {
  return {
    type: Actions.CARD_ADDED,
    payload: {
      id: id,
      stage: stage,
      title: title,
      description: description,
    },
  };
}
export function updateCard(id, prop, title = "", description = "") {
  return {
    type: Actions.CARD_UPDATED,
    payload: {
      id: id,
      property: prop,
      title: title,
      description: description,
    },
  };
}
export function swapCard(id, direction) {
  return {
    type: Actions.SWAP,
    payload: {
      id: id,
      direction: direction,
    },
  };
}
export function advanceCard(id) {
  return {
    type: Actions.NEXT_STAGE,
    payload: {
      id: id,
    },
  };
}
export function deleteCard(id) {
  return {
    type: Actions.CARD_DELETED,
    payload: {
      id: id,
    },
  };
}
