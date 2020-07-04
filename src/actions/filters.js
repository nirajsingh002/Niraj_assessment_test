export const FILTERED_DATA = "FILTERED_DATA";

export function filteredData(filterBy, isChecked) {
  return {
      type: 'FILTERED_DATA',
      filterBy,
      isChecked
  }
}

export const CHECKED_ITEMS_FN = "CHECKED_ITEMS_FN";

export function checkedItemsFn(item, isChecked, filterBy) {
  return {
      type: 'CHECKED_ITEMS_FN',
        item,
        isChecked,
        filterBy
  }
}


export const REMOVE_FILTER = "REMOVE_FILTER";

export function removeFilter(item) {
  return {
      type: 'REMOVE_FILTER',
        item,
  }
}

