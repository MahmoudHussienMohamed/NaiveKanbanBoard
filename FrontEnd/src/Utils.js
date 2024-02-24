const UtilLib = {
  Capetalize1stChar: function (str) {
    return str[0].toUpperCase() + str.slice(1);
  },
  GetHeaderName: function (clsName) {
    let headerName = clsName.split("-");
    for (let i = 0; i < headerName.length; i++)
      headerName[i] = UtilLib.Capetalize1stChar(headerName[i]);
    if (headerName.length > 1) headerName = headerName.join(" ");
    return headerName;
  },
  // createNewButton: function(props){
  //     const {_id, cards, setCards, cardsCnt, setCount} = props;
  //     setCards([...cards, <Card colName = {_id}></Card>]);
  //     setCount(cardsCnt + 1);
  // }
  // deletion
};
export default UtilLib;
