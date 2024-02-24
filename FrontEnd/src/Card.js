import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";

const Card = (props) => {
  const { order, delFunc } = props;

  return (
    <div className="card">
      <div className="cards-text">
        <input
          type="text"
          className="title-input"
          placeholder="Enter Title Here"
        />
        <textarea
          id="description"
          name="description"
          placeholder="Enter description here..."
        ></textarea>
      </div>
      <div className="card-buttons">
        <button className="save button" onClick={(e) => {}}>
          Save
        </button>
        <button
          className="delete button"
          onClick={() => {
            delFunc(order);
          }}
        >
          Delete
        </button>
        <button className="next button" onClick={(e) => {}}>
          ⇉Next⇉
        </button>
        <button className="up button" onClick={(e) => {}}>
          ↑Up↑
        </button>
        <button className="down button" onClick={(e) => {}}>
          ↓Down↓
        </button>
      </div>
    </div>
  );
};

export default Card;
