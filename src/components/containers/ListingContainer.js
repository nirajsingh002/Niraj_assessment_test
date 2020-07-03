import React, { Component } from "react";
import injectSheet from "react-jss";

import SearchBox from "./SearchBox";
import SortComponent from "./SortComponent";
import ColumnStyles from "../../jss/reusables/styles/column";
import Filters from "./Filters";

// reusable components
import Reusables from "../../jss/reusables/inputs";

import "../App.css";

class ListingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      checkedItems: new Map(),
    };
    this.detailsList = this.detailsList.bind(this);
    console.log('props of listing', this.props)
  }

  
  detailsList(item, arrayOfDetails) {
    return arrayOfDetails.map((charAttribute, index) => (
      <li key={index}>
        <span>{charAttribute}</span>
        <span>
          {charAttribute === "origin" || charAttribute === "location"
            ? item[charAttribute]["name"]
            : item[charAttribute]}
        </span>
      </li>
    ));
  }
  

  

  /* callbackFunction = (childData) => {
    this.setState({ filtered: childData }, () => {
      console.log("filtered parent", this.state.items);
    });
  }; */

  callbackFunctionFilters = (childDataCheckbox) => {
    this.setState({ checkedItems: childDataCheckbox }, () => {
      console.log("check items", this.state.checkedItems);
    });
  };

  render() {
    const ColumnComponent = injectSheet(ColumnStyles)(Reusables.Column);
    const { isFetching, items } = this.props.data.cartoonCharacters;
    const { error, dropDownValue } = this.state;
    const { filtered, checkedItems } = this.props.data.cartoonCharacters;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isFetching) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <Filters
            filtersProps={this.props}
            // parentCallback={this.callbackFunctionFilters}
          />
          <ColumnComponent>
            <div className="row">
              <ColumnComponent size="6">
                <SearchBox
                  searchProps={this.props}
                />
              </ColumnComponent>
              <ColumnComponent size="6">
                <SortComponent sortDataProps={this.props}/>
              </ColumnComponent>
            </div>
            <div className="row row-cols-4 listContainer">
            {(checkedItems.length && !filtered.length) 
                        ? 
                        <div>No item found!</div> 
                        :
              (filtered.length ? filtered : items).map((item, index) => (
                <ColumnComponent key={index}>
                  <div className="tiles">
                    <div className="imageBox">
                      <img src={item.image} />
                      <div className="ImgDescription">
                        <p>{item.name}</p>
                        <p>{item.created}</p>
                      </div>
                    </div>
                    <div className="details">
                      <ul>
                      {this.detailsList(item, [
                          "status",
                          "species",
                          "gender",
                          "origin",
                          "location",
                        ])}
                      </ul>
                    </div>
                  </div>
                </ColumnComponent>
              ))}
            </div>
          </ColumnComponent>
        </>
      );
    }
  }
}

export default ListingContainer;
