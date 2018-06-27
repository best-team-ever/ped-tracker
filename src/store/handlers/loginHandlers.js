import {
  loginAction,
  logoutAction,
  setMsgAction
} from "../actions/loginAction";


export function loginHandler(dispatch, userId, firstName, p2pe_agreement) {
  localStorage.setItem("userId", userId);
  dispatch(loginAction(userId, firstName, p2pe_agreement));
}

export function logoutHandler(dispatch) {
  localStorage.removeItem("userId");
  return Promise.resolve(dispatch(logoutAction()));
}

export function setMsgHandler(dispatch, msg) {
  return dispatch(setMsgAction(msg));
}

