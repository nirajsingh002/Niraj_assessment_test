import React, { Component } from "react";
import injectSheet from "react-jss";

import checkboxes from "../../data/checkboxdata";
import Checkbox from "../presentations/Checkbox";

import ColumnStyles from "../../jss/reusables/styles/column";

// reusable components
import Reusables from "../../jss/reusables/inputs";
class Filters extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleChange = (e) => {
    const item = e.target.name.toLowerCase();
    const isChecked = e.target.checked;
    const filterBy = e.target.getAttribute("filterBy");

    this.props.filtersProps.data.checkedItemsFn(item, isChecked, filterBy);
    this.props.filtersProps.data.filteredData(filterBy, isChecked);
  };

  toggleFilterItems = (groupHeading, checkedItems, groupItem) => {
    let isChecked = false;
    Object.keys(checkedItems).forEach((filterCategory) => {
      if(filterCategory === groupHeading) {
        isChecked = checkedItems[filterCategory].includes(
                      groupItem.label.toLowerCase()
                    )
                    console.log('isChecked',checkedItems[filterCategory], isChecked)
      }
    })
    return isChecked;
  }

  filterHtml = (checkedItems) => {
    return checkboxes.map((groupName, groupNameIndex) =>
      Object.keys(groupName).map((groupHeading, groupHeadingIndex) => {
        return (
          <div key={`${groupNameIndex}_${groupHeadingIndex
          }`}>
            <h2>{groupHeading}</h2>
            <ul key={groupNameIndex}>
              {checkboxes[groupNameIndex][groupHeading].map(
                (groupItem, groupItemIndex) => {
                  return (
                    <li key={`${groupNameIndex}_${groupItemIndex}`}>
                      <label>
                        <Checkbox
                          name={groupItem.label}
                          checked={this.toggleFilterItems(groupHeading, checkedItems, groupItem)}
                          filterBy={groupHeading}
                          onChange={this.handleChange}
                        />
                        {groupItem.label}
                      </label>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        );
      })
    );
  };

  render() {
    const ColumnComponent = injectSheet(ColumnStyles)(Reusables.Column);
    const { checkedItems } = this.props.filtersProps.data.cartoonCharacters;
    return (
      <ColumnComponent size="2">
        <h1>Filter</h1>
        <div>{this.filterHtml(checkedItems)}</div>
      </ColumnComponent>
    );
  }
}

export default Filters;
