import {
  SIGNIN,
  SIGNOUT,
  SET_MSG,
} from "../actions/actionTypes";

const initialState = {
  signed: false,
  msg: ""
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SIGNIN:
      return {
        ...state,
        signed: true,
        msg: ""
      };

    case SIGNOUT:
      return {
        ...state,
        signed: false
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
