import fetch from "cross-fetch";
import { sortAscending, sortDescending } from './sort';
import { searchByName } from './searchBox';
import { filteredData, checkedItemsFn, removeFilter } from './filters';

export const SELECT_CHARACTERS = 'SELECT_CHARACTERS'

export function selectCharacter(characters) {
  return {
    type: SELECT_CHARACTERS,
    characters
  }
}

export const REQUEST_CHARACTERS = "REQUEST_CHARACTERS";
function requestCharacters(character) {
  return {
    type: REQUEST_CHARACTERS,
    character,
  };
}

export const RECEIVE_CHARACTERS = "RECEIVE_CHARACTERS";
function receiveCharacters(characterJson) {
  return {
    type: RECEIVE_CHARACTERS,
    characters: characterJson.results,
    receivedAt: Date.now(),
  };
}


function shouldFetchPosts(state) {
    const characters = state.fetchCharacters
    if (characters.items.length) {
      return true
    } else if (characters.isFetching) {
      return false
    } else {
      return true
    }
  }

  export function fetchPostsIfNeeded() {
    return (dispatch, getState) => {
      if (shouldFetchPosts(getState())) {
        return dispatch(fetchCharacters())
      }
    }
  }

/**
 *  Thunk action creator!
 *
 **/

export function fetchCharacters(character) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestCharacters(character));

    /**
     * The function called by the thunk middleware can return a value,
     * that is passed on as the return value of the dispatch method.
     *
     * In this case, we return a promise to wait for.
     * This is not required by thunk middleware, but it is convenient for us.
     */

    return fetch(`https://rickandmortyapi.com/api/character/`)
      .then((response) => response.json())
      .then((json) =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API ccall.

        dispatch(receiveCharacters(json))
      );
  };
}


export {sortAscending, sortDescending, searchByName, filteredData,  checkedItemsFn, removeFilter}