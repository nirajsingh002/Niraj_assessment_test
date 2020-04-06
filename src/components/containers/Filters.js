import React, { Component } from 'react'
import injectSheet from "react-jss";

import checkboxes from '../../data/checkboxdata';
import Checkbox from '../presentations/Checkbox';

import ColumnStyles from '../../jss/reusables/styles/column';

// reusable components
import Reusables from '../../jss/reusables/inputs';
class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            checkedItems: new Map(),
        }
    }
    
    componentDidMount() {
        this.setState({
            filtered: this.state.filtered
        }, () => {
            console.log('filtered', this.state.filtered)
        });
    }

    handleChange = (e) => {
        
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }), () => {
            // console.log('state', this.state);
            // this.filterData()
        });
      }

      filterData = (e) => {
          // Variable to hold the original version of the list
          let currentList = [];
          // Variable to hold the filtered list before putting into state
          let newList = [];
          if(this.state.checkedItems.size) {
            // assign the original list to currentList
            currentList = this.props.items;
            //  Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change the current item to lowercase
                const lc = item.species.toLowerCase();
                // change search term to lowercase
                const filter = this.state.checkedItems.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search contents
                return lc.includes(filter);
            });  
          } else {
            // If the search bar is empty, set newList to original task list
            newList = this.props.items;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        }, () => {
            console.log('A name was submitted: ', this.state.filtered);
            this.sendData();
        })
      }
    sendData = () => {
        this.props.parentCallback(this.state.checkedItems);
        }

    render() {
        const ColumnComponent = injectSheet(ColumnStyles)(Reusables.Column)

        return (
            
                <ColumnComponent size="2">
                    <h1>Filter</h1>
                    <div>
                        <h2>Species</h2>
                        <ul>
                        
                        {checkboxes[0]['species'].map((item, index) => (
                            <div>
                            <label key={index}>
                            <Checkbox name={item.label} checked={this.state.checkedItems.get(item.label)} onChange={this.handleChange} />
                            {item.label}
                            </label>
                            </div>
                        ))
                        }
                        </ul>
                    </div>
                    <div>
                        <h2>Gender</h2>
                        <ul>
                            <li>
                                <input type="checkbox" /> Male
                            </li>
                            <li>
                                <input type="checkbox" /> Female
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>Origin</h2>
                        <ul>
                            <li>
                                <input type="checkbox" /> Unknown
                            </li>
                            <li>
                                <input type="checkbox" /> Post-Apocalyptic Earth
                            </li>
                            <li>
                                <input type="checkbox" /> Nuptia 4
                            </li>
                            <li>
                                <input type="checkbox" /> Other Origins ...
                            </li>
                        </ul>
                    </div>
                </ColumnComponent>
            
        )
    }
}

export default Filters;