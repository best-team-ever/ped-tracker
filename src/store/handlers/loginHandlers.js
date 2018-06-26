import {
  loginAction,
  logoutAction,
  setMsgAction
} from "../actions/loginAction";


export function loginHandler(dispatch) {
  dispatch(loginAction());
}

export function logoutHandler(dispatch) {
  dispatch(logoutAction());
}

export function setMsgHandler(dispatch, msg) {
  dispatch(setMsgAction(msg));
}
