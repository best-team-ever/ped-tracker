import {
  FETCH_SIGNIN,
  FETCH_SIGNOUT,
} from "../actions/actionTypes";

const initialState = {
  signed: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_SIGNIN:
      return {
        ...state,
        signed: true
      };

    case FETCH_SIGNOUT:
      return {
        ...state,
        signed: false
      };


    default:
      return state;
  }
}
