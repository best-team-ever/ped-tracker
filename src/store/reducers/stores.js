import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import logger from "redux-logger";
import deviceReducer from "./deviceReducer";
import userReducer from "./userReducer";
import locationsReducer from "./locationsReducer";

let rootReducers = combineReducers({
  devices: deviceReducer,
  users: userReducer,
  locations: locationsReducer
});

let store;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  store = createStore(rootReducers, applyMiddleware(thunk, logger));
} else {
  store = createStore(rootReducers, applyMiddleware(thunk, logger));
}

export default store;
