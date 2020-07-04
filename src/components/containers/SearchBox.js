import React, { Component } from 'react'

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit = (event) => {
          event.preventDefault();
          this.props.searchProps.data.searchByName(this.state.value)
      }
      

      sendData = () => {
        this.props.parentCallback(this.state.filtered);
        }
        onClickremoveFilter = (item, isChecked) => {
            this.props.searchProps.data.removeFilter(item, isChecked)
            this.props.searchProps.data.filteredData("species")
        }
    render() {

        return (
            <>
                <div>Selected Filter</div>
                <ul className="selectedFilter">
                {/* {this.props.searchProps.data.cartoonCharacters.checkedItems.map((item) => {
                    return (<li>{item}<span onClick={() => this.onClickremoveFilter(item, false)}>X</span></li>)
                })} */}
                </ul>
                <div className="mBottom10">
                    <form onSubmit={this.handleSubmit} key="1">
                        <label>
                            Search by Name:
                            <input key="2" type="text" name="search" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
</>
        )
    }
}

export default SearchBox;
