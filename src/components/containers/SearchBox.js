import React, { Component } from 'react'

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            value: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            filtered: this.state.filtered
        }, () => {
            console.log('filtered', this.state.filtered)
        });
    }

    
    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
          // Variable to hold the original version of the list
            let currentList = [];
            // Variable to hold the filtered list before putting into state
            let newList = [];
            // if the search bas isn't empty
            if(event.target.value !== "") {
                // assign the original list to currentList
                currentList = this.props.items;
                //  Use .filter() to determine which items should be displayed
                // based on the search terms
                newList = currentList.filter(item => {
                    // change the current item to lowercase
                    const lc = item.name.toLowerCase();
                    // change search term to lowercase
                    const filter = this.state.value.toLowerCase();
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
            

        
        event.preventDefault();
      }

      sendData = () => {
        this.props.parentCallback(this.state.filtered);
        }
    render() {

        return (
            <>
                <div>Selected Filter</div>
                <div>
                    <form onSubmit={this.handleSubmit} key="1">
                        <label>
                            Search by Name:
                            <input key="2" type="text" name="search" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    <ul>
						{this.state.filtered.map(item => (
							<li key={item.id}>
								{item.name} &nbsp;
								{/* <span
									className="delete"
									onClick={() => this.props.delete(item)}
									/> */}
							</li>
						))}
					</ul>
                </div>
</>
        )
    }
}

export default SearchBox;
