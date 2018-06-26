import {
  SIGNIN,
  SIGNOUT,
  SET_MSG,
} from "./actionTypes";

const urlApi = "http://localhost:8000/api/";

export const loginAction = () => ({
    type: SIGNIN
});

export const logoutAction = () => ({
  type: SIGNOUT
});

export const setMsgAction = (text) => ({
  type: SET_MSG,
  msg: text
});
