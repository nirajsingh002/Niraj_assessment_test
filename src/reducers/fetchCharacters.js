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
    checkedItems: {},
    searchValue: "",
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

      return Object.assign({}, state, { items: action.data.items });

    case "SORT_DESCENDING":
      action.data.items
        .sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
        .reverse();

      return Object.assign({}, state, { items: action.data.items });
    case "SEARCH_BY_NAME": {
      // Variable to hold the original version of the list
      let currentList = [];
      // Variable to hold the filtered list before putting into state
      let newList = [];
      // if the search bas isn't empty
      if (action.data !== "") {
        // assign the original list to currentList
        currentList = state.items;
        //  Use .filter() to determine which items should be displayed
        // based on the search terms
        newList = currentList.filter((item) => {
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
      return Object.assign({}, state, { filtered: newList });
    }
    case "REMOVE_FILTER":
    case "CHECKED_ITEMS_FN": {
      let { checkedItems } = state;

      /* 
        
{
    species: [],
    gender: [],
    origin: []
}
        */

      /* checkedItems.find(action.item) && action.isChecked ? 
                checkedItems.push(action.item) : 
                checkedItems = checkedItems.filter(item => item !== action.item);

          return Object.assign({}, state, {checkedItems} ) */
      // In case of empty checkedItems then create array
      if (!checkedItems.hasOwnProperty(action.filterBy)) {
        checkedItems[action.filterBy] = [];
      }
      /**
       * Check filter add/remove
      */

     checkedItems[action.filterBy].indexOf(action.item) === -1 && action.isChecked ? 
     checkedItems[action.filterBy].push(action.item) : 
     checkedItems[action.filterBy] = checkedItems[action.filterBy].filter(item => item !== action.item);

      // checkedItems[action.filterBy].push(action.item);
      console.log("checkedItems", checkedItems);
      return Object.assign({}, state, { checkedItems });
    }
    case "FILTERED_DATA": {
      // filter by data
      let filterBy = action.filterBy;
      // Variable to hold the original version of the list
      let currentList = [];
      // Variable to hold the filtered list before putting into state
      let newList = [];
      if (!isEmpty(state.checkedItems)) {
        /**
         * Add filter
         * if filter added on the data then check we have already filtered data or not
         * if yes then apply the filter on filtered data else run on whole data
         */
        if (action.isChecked) {
          currentList = state.filtered.length ? state.filtered : state.items;
        } else {
        /**
         * Remove filter
         * if remove filter then run the filter on whole data
         */
          currentList = state.items;
        }

        // isChecked in filter variable
        let isCheckedItem = false;
        //  Use .filter() to determine which items should be displayed
        // based on the search terms
        newList = currentList.filter((item) => {
          // change the current item to lowercase
          let lc;
          // add filter
          if (action.isChecked) {
            lc = isObject(item[filterBy])
            ? [item[filterBy]["name"].toLowerCase()]
            : [item[filterBy].toLowerCase()];
          } 
          // change search term to lowercase
          const checkedItemsLists = state.checkedItems; //.toLowerCase();
          // check to see if the current list item includes the search term
          // If it does, it will be added to newList. Using lowercase eliminates
          // issues with capitalization in search terms and search contents
          Object.keys(checkedItemsLists).map(filterCategory => {
            checkedItemsLists[filterCategory].length && checkedItemsLists[filterCategory].some((checkedItem) => {
              // isCheckedItem = lc.includes(checkedItem);
              if(action.isChecked) {
                isCheckedItem = lc.includes(checkedItem);
              } else {
                isCheckedItem = [item[filterCategory].toLowerCase()].includes(checkedItem);
              }
              if (isCheckedItem) {
                return isCheckedItem;
              }
            }); 
          })
          /* checkedItemsLists.some((checkedItem) => {
            isCheckedItem = lc.includes(checkedItem);
            if (isCheckedItem) {
              return isCheckedItem;
            }
          }); */
          return isCheckedItem;
        });
      } else {
        // If the search bar is empty, set newList to original task list
        newList = state.items;
      }
      // Set the filtered state based on what our rules added to newList
      return Object.assign({}, state, { filtered: newList });
    }
    default:
      return state;
  }
};

function isObject(val) {
  return val instanceof Object;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default fetchCharacters;
