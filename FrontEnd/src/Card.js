import {
  updateCard,
  swapCard,
  advanceCard,
  deleteCard,
} from "./redux/ActionCreator";
import * as Actions from "./redux/ActionTypes";
import store from "./redux/store";
import UtilLib from "./Utils";

const Card = (props) => {
  let { id, title, description } = props;
  return (
    <div className={id + " card"} key={id}>
      <div className="cards-text">
        <input
          type="text"
          className="title-input"
          placeholder={title ? title : "Enter Title Here"}
          onChange={(e) => {
            store.dispatch(updateCard(id, Actions.TITLE_PROP, e.target.value));
          }}
        />
        <textarea
          id="description"
          name="description"
          placeholder={description ? description : "Enter description here..."}
          onChange={(e) => {
            store.dispatch(
              updateCard(id, Actions.DESCR_PROP, "", e.target.value)
            );
          }}
        >
          {description ? description : ""}
        </textarea>
      </div>
      <div className="card-buttons">
        <button
          className="save button"
          onClick={() => {
            UtilLib.uploadCard(UtilLib.asDTO(id));
          }}
        >
          Save
        </button>
        <button
          className="delete button"
          onClick={() => {
            store.dispatch(deleteCard(id));
          }}
        >
          Delete
        </button>
        <button
          className="next button"
          onClick={() => {
            store.dispatch(advanceCard(id));
          }}
        >
          ⇉Next⇉
        </button>
        <button
          className="up button"
          onClick={() => {
            store.dispatch(swapCard(id, Actions.SWAP_UP));
          }}
        >
          ↑Up↑
        </button>
        <button
          className="down button"
          onClick={() => {
            store.dispatch(swapCard(id, Actions.SWAP_DOWN));
          }}
        >
          ↓Down↓
        </button>
      </div>
    </div>
  );
};

export default Card;
