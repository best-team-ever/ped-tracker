import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import logger from "redux-logger";
import deviceReducer from "./deviceReducer";
import devicesReducer from "./devicesReducer";
import userReducer from "./userReducer";
import locationsReducer from "./locationsReducer";
import eventsReducer from "./eventsReducer";

let rootReducers = combineReducers({
  device: deviceReducer,
  devices: devicesReducer,
  users: userReducer,
  locations: locationsReducer,
  events: eventsReducer
});

let store;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  store = createStore(rootReducers, applyMiddleware(thunk, logger));
} else {
  store = createStore(rootReducers, applyMiddleware(thunk, logger));
}

export default store;
