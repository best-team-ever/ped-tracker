import {
  SIGNIN,
  SIGNOUT,
  SET_MSG
} from "../actions/actionTypes";

const initialState = {
  signed: false,
  msg: "",
  userId: "",
  firstName: "",
  p2pe_agreement: ""
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SIGNIN:
      return {
        ...state,
        signed: true,
        msg: "",
        userId: action.userId,
        firstName: action.firstName,
        p2pe_agreement: action.p2pe_agreement
      };

    case SIGNOUT:
      return {
        ...state,
        signed: false,
        // userId: "",
        // firstName: "",
        // p2pe_agreement: ""
      };

    case SET_MSG:
      return {
        ...state,
        msg: action.msg
      };

    default:
      return state;
  }
}
