import Stage from "./Stage";
import "./index.css";
import { useState } from "react";

function App() {
  const [toDoCards, setToDoCards] = useState([]),
    [inProgressCards, setInProgressCards] = useState([]),
    [reviewCards, setReviewCards] = useState([]),
    [completedCards, setCompletedCards] = useState([]);

  return (
    <div className="App">
      <h1 className="title">Kanban Board</h1>
      <div className="container">
        <Stage _id={"to-do"} cards={toDoCards} setCards={setToDoCards}></Stage>
        <Stage
          _id={"in-progress"}
          cards={inProgressCards}
          setCards={setInProgressCards}
        ></Stage>
        <Stage
          _id={"review"}
          cards={reviewCards}
          setCards={setReviewCards}
        ></Stage>
        <Stage
          _id={"completed"}
          cards={completedCards}
          setCards={setCompletedCards}
        ></Stage>
      </div>
    </div>
  );
}

export default App;
