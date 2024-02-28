import * as Actions from "./ActionTypes";
import { STAGES } from "../Utils";
import UtilLib from "../Utils";

let lastId = 0;
class ReduxUtilWrapper {
  #state;
  #action;
  constructor(state, action) {
    this.#state = state;
    this.#action = action;
  }
  static cardToDTO(card) {
    const { stage, ...dto } = card;
    dto.colName = card.stage;
    return dto;
  }
  stateWithSwappedIndices(i, j, keepIndices = false) {
    let newState = [...this.#state];
    [newState[i], newState[j]] = [newState[j], newState[i]];
    if (keepIndices)
      [newState[i].id, newState[j].id] = [newState[j].id, newState[i].id];
    return newState;
  }
  stateWithAppendedCard(payload) {
    if (payload === undefined) payload = this.#action.payload;
    else UtilLib.uploadCard(ReduxUtilWrapper.cardToDTO(payload));
    return [
      ...this.#state,
      {
        stage: payload.stage,
        id: payload.id === undefined ? payload.stage + ++lastId : payload.id,
        title: payload.title,
        description: payload.description,
      },
    ];
  }
  stateWithUpdatedCardText() {
    const { id, title, description } = this.#action.payload;
    const updatedCard = (card) => {
      return this.#action.payload.property === Actions.TITLE_PROP
        ? { ...card, title: title }
        : { ...card, description: description };
    };
    return this.#state.map((card) =>
      card.id !== id ? card : updatedCard(card)
    );
  }
  stateWithSwappedCard() {
    const { id, direction } = this.#action.payload;
    const idx = this.#state.findIndex((card) => card.id == id);
    if (idx == -1) return this.#state;
    const otherIdx = idx + (direction === Actions.SWAP_UP ? -1 : 1);
    if (otherIdx < 0 || otherIdx >= this.#state.length) return this.#state;
    const newState = this.stateWithSwappedIndices(idx, otherIdx, true);
    const j = otherIdx;
    console.log(newState[idx], newState[j], "\n");
    // [newState[idx].id, newState[j].id] = [newState[j].id, newState[idx].id];
    // console.log(newState[idx], newState[j]);
    UtilLib.updateDBCard(ReduxUtilWrapper.cardToDTO(newState[idx]));
    UtilLib.updateDBCard(ReduxUtilWrapper.cardToDTO(newState[j]));
    return newState;
  }
  stateWithDeletedCard(cardIdx = null) {
    const idToDelete =
      cardIdx === null ? this.#action.payload.id : this.#state[cardIdx].id;
    UtilLib.deleteDBCard(idToDelete);

    if (cardIdx === null)
      return this.#state.filter((card) => card.id !== this.#action.payload.id);
    const newState = [...this.#state];
    newState.splice(cardIdx, 1);
    return newState;
  }
  extractStage() {
    return this.#state.find((card) => card.id === this.#action.payload.id)
      ?.stage;
  }
  static getNextStage(currentStage) {
    const stages = Object.values(STAGES);
    const currentStageIdx = stages.indexOf(currentStage);
    return stages[currentStageIdx + 1];
  }
  stateWithMovedCard() {
    const id = this.#action.payload.id;
    const currentStage = this.extractStage();
    if (currentStage === STAGES.COMPLETED) return this.#state;
    const nextStage = ReduxUtilWrapper.getNextStage(currentStage);
    // newCard.stage = nextStage;
    return this.#state.map((card) => {
      if (!card.id || card.id !== id) return card;
      const newCard = { ...card, stage: nextStage };
      UtilLib.updateDBCard(ReduxUtilWrapper.cardToDTO(newCard));
      return newCard;
    });
  }
}
export default ReduxUtilWrapper;
