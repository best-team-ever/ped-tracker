import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import logger from "redux-logger";
import deviceReducer from "./deviceReducer";
import devicesReducer from "./devicesReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import locationReducer from "./locationReducer";
import locationsReducer from "./locationsReducer";
import loginReducer from "./loginReducer";
import eventsReducer from "./eventsReducer";


let rootReducers = combineReducers({
  login: loginReducer,
  msg: loginReducer,
  user: userReducer,
  users: usersReducer,
  location: locationReducer,
  locations: locationsReducer,
  device: deviceReducer,
  devices: devicesReducer,
  events: eventsReducer
});

let store;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  store = createStore(rootReducers, applyMiddleware(thunk, logger));
} else {
  store = createStore(rootReducers, applyMiddleware(thunk, logger));
}

export default store;
