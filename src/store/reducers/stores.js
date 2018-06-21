import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import logger from "redux-logger";
import deviceReducer from "./deviceReducer";

let rootReducers = combineReducers({
  devices: deviceReducer,
});

let store;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  store = createStore(rootReducers, applyMiddleware(thunk, logger));
} else {
  store = createStore(rootReducers, applyMiddleware(thunk, logger));
}

export default store;
