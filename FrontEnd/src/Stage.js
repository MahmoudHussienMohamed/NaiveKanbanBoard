import UtilLib from "./Utils";
import store from "./redux/store";
import { addCard } from "./redux/ActionCreator";

const Stage = (props) => {
  const { name, cards, setCards } = props;
  const headerName = UtilLib.getHeaderName(name);
  store.subscribe(() => {
    setCards(store.getState().filter((card) => card.stage === name));
  });

  const clsName = name + " stage";
  return (
    <div className={clsName} id={name} key={clsName}>
      <h2>{headerName}</h2>
      <button
        className="new-card-button"
        onClick={() => {
          store.dispatch(addCard(name));
        }}
      >
        <b>+ New Card</b>
      </button>
      <div className="cards">
        {cards.map((card) => UtilLib.newCardComp(card, name))}
      </div>
    </div>
  );
};

export default Stage;
