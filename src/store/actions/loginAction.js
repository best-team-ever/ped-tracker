import {
  FETCH_SIGNIN,
  FETCH_SIGNOUT,
} from "./actionTypes";

const urlApi = "http://localhost:8000/api/";

export const fetchLogin = () => ({
  type: FETCH_SIGNIN
});

export const fetchLogout = () => ({
  type: FETCH_SIGNOUT
});
