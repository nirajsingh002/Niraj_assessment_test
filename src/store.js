import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { selectCharacter, fetchCharacters } from "./actions/actionCreators";

// import the root reducer
import rootReducer from './reducers/index';

// import comments from './data/comments';

// create an object for the default data
const defaultState = {}

const enhancers = compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)
const store = createStore(rootReducer, defaultState, enhancers);


export default store;