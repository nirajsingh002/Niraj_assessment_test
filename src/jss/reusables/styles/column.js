const grid_columns = 12;

const ColumnStyles = (size, columns = grid_columns) => ({
  col: (props) =>
    props.size
      ? {
          flex: "0 0" + (props.size / columns) * 100 + "%",
          // Add a `max-width` to ensure content within each column does not blow out
          // the width of the column. Applies to IE10+ and Firefox. Chrome and Safari
          // do not appear to require this.
          "max-width": (props.size / columns) * 100 + "%",
          border: "1px solid #333333",
          position: "relative",
          width: "100%",
          "padding-right": "15px",
          "padding-left": "15px",
        }
      : {
          "-ms-flex-preferred-size": 0,
          "flex-basis": 0,
          "-webkit-box-flex": 1,
          "-ms-flex-positive": 1,
          "flex-grow": 1,
          "max-width": "100%",
          border: "1px solid #333333",

          position: "relative",
          width: "100%",
          "padding-right": "15px",
          "padding-left": "15px",
        },
});
export default ColumnStyles;
