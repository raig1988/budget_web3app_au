// styles
export const tableStyle = { borderSpacing: "0px", margin: "20px auto", width: "100%" };

export const tableDetailSummary = { borderSpacing: '0px', margin: 'auto'}

export const thStyle = {
  border: "solid 1px black",
  background: "#D9D9D9",
  color: "black",
  fontWeight: "bold",
  padding: "10px 3px",
};

export const tdStyle = {
  padding: "10px",
  border: "solid 1px black",
  background: "#D9D9D9",
  textAlign: "center",
}

export const tdStyleRed =  {
  background: '#AF0000', // red
  border: 'solid 1px black',
  color: 'white',
  textAlign: 'center',
}

export const tdStyleGreen = {
    background: 'green',
    border: 'solid 1px black',
    color: 'white',
    textAlign: 'center',
}

export const tdSummary = (cell) => ({
  padding: "10px",
  border: "solid 1px black",
  textAlign: "center",
  background: cell.isGrouped
    ? "#217D1C"
    : cell.isAggregated
    ? "black"
    : cell.isPlaceholder
    ? "black"
    : "#D9D9D9",
  color: cell.isGrouped
    ? "white"
    : cell.isAggregated
    ? "white"
    : cell.isPlaceholder
    ? "white"
    : "black",
})

export const tdFooterStyle = {
  border: "solid 1px black",
  background: "#D9D9D9",
  color: "black",
  fontWeight: "bold",
  padding: "10px 3px",
  textAlign: "center",
}