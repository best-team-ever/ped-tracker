import {
  SIGNIN,
  SIGNOUT,
  SET_MSG,
} from "./actionTypes";

export const loginAction = (userId, firstName, p2pe_agreement, userLocationId, userRole) => ({
  type: SIGNIN,
  userId: userId,
  firstName: firstName,
  p2pe_agreement: p2pe_agreement,
  userLocationId: userLocationId,
  userRole: userRole
});

export const logoutAction = () => ({
  type: SIGNOUT
});

export const setMsgAction = (text) => ({
  type: SET_MSG,
  msg: text
});
