import {
  SIGNIN,
  SIGNOUT,
  SET_MSG,
} from "./actionTypes";

const urlApi = "http://localhost:8000/api/";

export const loginAction = (userId, firstName) => ({
    type: SIGNIN,
    userId: userId,
    firstName: firstName
});

export const logoutAction = () => ({
  type: SIGNOUT
});

export const setMsgAction = (text) => ({
  type: SET_MSG,
  msg: text
});
