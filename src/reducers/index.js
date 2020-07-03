import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import fetchCharacters from './fetchCharacters';

const rootReducer = combineReducers({fetchCharacters, routing: routerReducer });

export default rootReducer;