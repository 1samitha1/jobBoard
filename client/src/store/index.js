import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../src/reducers/rootReducer';
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [
  thunk
]
// const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middleware)
))
