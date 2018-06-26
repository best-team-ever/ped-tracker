import {
  loginAction,
  logoutAction,
  setMsgAction
} from "../actions/loginAction";


export function loginHandler(dispatch, userId, firstName) {
  dispatch(loginAction(userId, firstName));
}

export function logoutHandler(dispatch) {
  dispatch(logoutAction());
}

export function setMsgHandler(dispatch, msg) {
  dispatch(setMsgAction(msg));
}
