import Card from "./Card";
import { useState } from "react";
import UtilLib from "./Utils";
const Stage = (props) => {
  // const [cards, setCards] = useState([]);
  const [cardsCnt, setCount] = useState(0);
  const { _id, cards, setCards } = props;
  const delCard = (order) => {
    setCards(
      (prevState) => {
        return cards.filter((_, index) => index !== order);
      },
      () => {
        setCount(cardsCnt - 1);
      }
    );
  };
  const headerName = UtilLib.GetHeaderName(_id);

  const clsName = _id + " stage";
  return (
    <div className={clsName} id={_id}>
      <h2>{headerName}</h2>

      <button
        className="new-card-button"
        onClick={() => {
          setCards([
            ...cards,
            <Card
              order={cards.length}
              delFunc={(order) => {
                delCard(order);
              }}
            ></Card>,
          ]);
          setCount(cardsCnt + 1);
        }}
      >
        <b>+ New Card</b>
      </button>
      <div className="cards">
        {cards.map((card, index) => {
          return (
            <Card
              order={index}
              delFunc={(order) => {
                delCard(order);
              }}
            ></Card>
          );
        })}
      </div>
    </div>
  );
};

export default Stage;
