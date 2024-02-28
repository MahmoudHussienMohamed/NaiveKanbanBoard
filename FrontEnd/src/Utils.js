import Card from "./Card";
import store from "./redux/store";

export const LINK = "http://localhost:9292/KanbanBoard";
const UtilLib = {
  capetalize1stChar: function (str) {
    return str[0].toUpperCase() + str.slice(1);
  },
  getHeaderName: function (clsName) {
    let headerName = clsName.split("-");
    for (let i = 0; i < headerName.length; i++)
      headerName[i] = UtilLib.capetalize1stChar(headerName[i]);
    if (headerName.length > 1) headerName = headerName.join(" ");
    return headerName;
  },
  newCardComp: function (cardObj) {
    const { id, stage, title, description } = cardObj;
    return <Card id={id} title={title} description={description} />;
  },
  asDTO: function (id) {
    const { title, description, stage } = {
      ...store.getState().find((card) => card.id === id),
    };
    // const { title, description, stage}
    return { title: title, description: description, colName: stage };
  },
  uploadCard: function (cardData) {
    if (!cardData || !cardData.id) delete cardData.id;
    // const cardData = UtilLib.asDTO(id);
    fetch(LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to upload card");
        return response.json();
      })
      .then((data) => {
        console.log("Card uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading card:", error);
      });
  },
  deleteDBCard: function (id) {
    fetch(LINK + "/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete card");
      })
      .then(() => {
        console.log("Card deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  },
  updateDBCard: function (cardData) {
    console.log(LINK + "/update/" + cardData.id);
    fetch(LINK + "/update/" + cardData.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update card");
        return response.json();
      })
      .then((data) => {
        console.log("Card updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating card:", error);
      });
  },
};
export const STAGES = {
  TODO: "to-do",
  INPROGRESS: "in-progress",
  REVIEW: "review",
  COMPLETED: "completed",
};
export default UtilLib;
