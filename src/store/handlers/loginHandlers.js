import {
  loginAction,
  logoutAction,
  setMsgAction
} from "../actions/loginAction";


export function loginHandler(dispatch, userId, firstName) {
  localStorage.setItem("userId", userId);
  dispatch(loginAction(userId, firstName));
}

export function logoutHandler(dispatch) {
  localStorage.removeItem("userId");
  dispatch(logoutAction());
}

export function setMsgHandler(dispatch, msg) {
  dispatch(setMsgAction(msg));
}
