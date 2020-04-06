import React, { Component } from 'react'
import injectSheet from "react-jss";

import SearchBox from './SearchBox';
import ColumnStyles from '../../jss/reusables/styles/column';
import Filters from './Filters';
// reusable components
import Reusables from '../../jss/reusables/inputs';

import '../App.css';

class ListingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            dropDownValue: '',
            filtered: null,
            checkedItems: new Map(),
        }
        this.detailsList = this.detailsList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sortDescending = this.sortDescending.bind(this);
    }

    componentDidMount() {
        fetch("https://rickandmortyapi.com/api/character/")
            .then(res => res.json())
            .then(
                (body) => {
                    this.setState({
                        isLoaded: true,
                        items: body.results
                    });

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow 
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                      isLoaded: true,
                      error
                    });
                  }
            )
            
    }

    detailsList(item, arrayOfDetails) {
       return arrayOfDetails.map(charAttribute => (
                                    <li>
                                        <span>{charAttribute}</span>
                                        <span>{(charAttribute === 'origin' || charAttribute === 'location') ? item[charAttribute]['name'] : item[charAttribute]}</span>
                                    </li> 
                                    )
            )
        
    }
    sortAscending() {
        const { items } = this.state;
        items.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
        this.setState({ items })
      }
      sortDescending() {
        const { items } = this.state;
        items.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)).reverse();

        this.setState({ items })
      }

      handleChange(event) {
        this.setState({dropDownValue: event.target.value}, () => {
            if(this.state.dropDownValue === 'desc') {
                this.sortDescending();
            } else {
                this.sortAscending();
            }
        })

      }
      
      callbackFunction = (childData) => {
        this.setState({filtered: childData}, () => {
            console.log('filtered parent', this.state.items)
        });
        }

        callbackFunctionFilters = (childDataCheckbox) => {
            this.setState({checkedItems: childDataCheckbox}, () => {
                console.log('check items', this.state.checkedItems)
            });
            }
      
    render() {
        const ColumnComponent = injectSheet(ColumnStyles)(Reusables.Column)

        const { error, isLoaded, items, filtered, dropDownValue } = this.state;
            if(error) {
                return <div>Error: {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Loading...</div>;
            } else {
                return (
                        <>
                        <Filters items={this.state.items} parentCallback = {this.callbackFunctionFilters}/>
                        <ColumnComponent>
                            <div className="row">
                            <ColumnComponent size="6">
                            <SearchBox items={this.state.items} parentCallback = {this.callbackFunction}/>
                                </ColumnComponent>
                                <ColumnComponent size="6">
                                    <select onChange={this.handleChange} value={dropDownValue}>
                                        <option>Select by ID</option>
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>
                                </ColumnComponent>
                            </div>
                            <div className="row row-cols-4 listContainer">
                            { (filtered ? filtered : items).map(item => (
                                <ColumnComponent>
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
                                                {this.detailsList(item, ['status', 'species', 'gender', 'origin', 'location'])}
                                            </ul>
                                        </div>
                                    </div>
                                </ColumnComponent>
                            ))}
                            </div>
                        </ColumnComponent>
                        </>
                )
            }
    }
}

export default ListingContainer;