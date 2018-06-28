import {
  loginAction,
  logoutAction,
  setMsgAction
} from "../actions/loginAction";


export function loginHandler(dispatch, userId, firstName, userLocationId) {
  localStorage.setItem("userId", userId);
  localStorage.setItem("userLocationId", userLocationId);
  dispatch(loginAction(userId, firstName, userLocationId));
}

export function logoutHandler(dispatch) {
  localStorage.removeItem("userId");
  dispatch(logoutAction());
}

export function setMsgHandler(dispatch, msg) {
  dispatch(setMsgAction(msg));
}
