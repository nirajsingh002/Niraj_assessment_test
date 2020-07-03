import React, { useState, useEffect } from "react";

export const SortComponent = ({ sortDataProps }) => {
  let dropDownValue = "";
  const handleChange = (event) => {
    dropDownValue = event.target.value;
    if (dropDownValue === "desc") {
      sortDataProps.data.sortDescending(sortDataProps.data.cartoonCharacters);
    } else {
      sortDataProps.data.sortAscending(sortDataProps.data.cartoonCharacters);
    }
  };

  return (
    <select onChange={handleChange} value={dropDownValue} className="alignRightMiddle">
      <option>Select by ID</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  );
};

export default SortComponent;
