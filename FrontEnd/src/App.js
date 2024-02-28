import Stage from "./Stage";
import "./index.css";
import { useState, useEffect } from "react";
import { STAGES } from "./Utils";
import { LINK } from "./Utils";
import { addCard } from "./redux/ActionCreator";
import store from "./redux/store";

function App() {
  const [toDoCards, setToDoCards] = useState([]),
    [inProgressCards, setInProgressCards] = useState([]),
    [reviewCards, setReviewCards] = useState([]),
    [completedCards, setCompletedCards] = useState([]);
  useEffect(() => {
    fetch(LINK)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (const card of data)
          store.dispatch(
            addCard(card.colName, card.id, card.title, card.description)
          );
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1 className="title">Kanban Board</h1>
      <div className="container">
        <Stage
          name={STAGES.TODO}
          cards={toDoCards}
          setCards={setToDoCards}
        ></Stage>
        <Stage
          name={STAGES.INPROGRESS}
          cards={inProgressCards}
          setCards={setInProgressCards}
        ></Stage>
        <Stage
          name={STAGES.REVIEW}
          cards={reviewCards}
          setCards={setReviewCards}
        ></Stage>
        <Stage
          name={STAGES.COMPLETED}
          cards={completedCards}
          setCards={setCompletedCards}
        ></Stage>
      </div>
    </div>
  );
}

export default App;
