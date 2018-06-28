import {
  SIGNIN,
  SIGNOUT,
  SET_MSG,
} from "./actionTypes";

export const loginAction = (userId, firstName, userLocationId) => ({
    type: SIGNIN,
    userId: userId,
    firstName: firstName,
    userLocationId: userLocationId
});

export const logoutAction = () => ({
  type: SIGNOUT
});

export const setMsgAction = (text) => ({
  type: SET_MSG,
  msg: text
});
