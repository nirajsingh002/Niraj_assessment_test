// Reducer takes in two things:

/**
 * 1. The action (info about what happened)
 * 2. Copy of current state
 */

const fetchCharacters = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    filtered: [],
    checkedItems: [],
    searchValue: ''
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_CHARACTERS":
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case "RECEIVE_CHARACTERS":
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.characters,
        lastUpdated: action.receivedAt,
      });
      case "SORT_ASCENDING":
        action.data.items.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
        console.log("ASC", action.data.items);
    return Object.assign({}, state, {items: action.data.items});

    case "SORT_DESCENDING":
      action.data.items.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)).reverse();
        console.log("DESC", action.data.items);
      return Object.assign({}, state, {items: action.data.items});
    case 'SEARCH_BY_NAME':
        console.log('search by name triggred!')
        // Variable to hold the original version of the list
          let currentList = [];
          // Variable to hold the filtered list before putting into state
          let newList = [];
          // if the search bas isn't empty
          if(action.data !== "") {
              // assign the original list to currentList
              currentList = state.items;
              //  Use .filter() to determine which items should be displayed
              // based on the search terms
              newList = currentList.filter(item => {
                  // change the current item to lowercase
                  const lc = item.name.toLowerCase();
                  // change search term to lowercase
                  const filter = action.data.toLowerCase();
                  // check to see if the current list item includes the search term
                  // If it does, it will be added to newList. Using lowercase eliminates
                  // issues with capitalization in search terms and search contents
                  return lc.includes(filter);
              });
          } else {
              // If the search bar is empty, set newList to original task list
              newList = state.items;
          }
          // Set the filtered state based on what our rules added to newList
          return Object.assign({}, state, {filtered: newList})
      case 'REMOVE_FILTER':
      case 'CHECKED_ITEMS_FN':
        let { checkedItems } = state;
              checkedItems.indexOf(action.item) === -1 && action.isChecked ? checkedItems.push(action.item) : checkedItems = checkedItems.filter(item => item !== action.item);
          return Object.assign({}, state, {checkedItems} )

      case 'FILTERED_DATA':
          // filter by data
          let filterBy = action.filterBy
          // Variable to hold the original version of the list
          currentList = [];
          // Variable to hold the filtered list before putting into state
          newList = [];
          if(state.checkedItems.length) {
            // assign the original list to currentList
            currentList = state.filtered.length ? state.filtered : state.items;
            // isChecked in filter variable
            let isCheckedItem = false;
            //  Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change the current item to lowercase
                const lc = isObject(item[filterBy]) ? [item[filterBy]['name'].toLowerCase()] : [item[filterBy].toLowerCase()];
                // change search term to lowercase
                const checkedItemsLists = state.checkedItems; //.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search contents
                checkedItemsLists.some(checkedItem => {
                  isCheckedItem = lc.includes(checkedItem);
                  if(isCheckedItem) {
                    return isCheckedItem
                  }
                })
                return isCheckedItem;
            }); 
          } else {
            // If the search bar is empty, set newList to original task list
            newList = state.items;
        }
        // Set the filtered state based on what our rules added to newList
        return Object.assign({}, state, {filtered: newList})
        /* this.setState({
            filtered: newList
        }, () => {
            console.log('A name was submitted: ', this.state.filtered);
            this.sendData();
        }) */
    default:
      return state;
  }
};

function isObject(val) {
  return val instanceof Object; 
}

export default fetchCharacters;
