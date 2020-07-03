export const SORT_ASCENDINNG = "SORT_ASCENDING";

export function sortAscending(data) {
  return {
      type: 'SORT_ASCENDING',
        data
  }
}

export const SORT_DESCENDINNG = "SORT_DESCENDING";

export function sortDescending(data) {
    return {
        type: 'SORT_DESCENDING',
        data
    }
}
