import * as Actions from "./ActionTypes";
import ReduxUtilWrapper from "./UtilWrapper";

export default function reducer(state = [], action) {
  const util = new ReduxUtilWrapper(state, action);

  if (action.type === Actions.CARD_ADDED) 
    return util.stateWithAppendedCard();
  else if (action.type === Actions.CARD_UPDATED) 
    return util.stateWithUpdatedCardText();
  else if (action.type === Actions.SWAP) 
    return util.stateWithSwappedCard();
  else if (action.type === Actions.NEXT_STAGE) 
    return util.stateWithMovedCard();
  else if (action.type === Actions.CARD_DELETED) 
    return util.stateWithDeletedCard();
  return state;
}
