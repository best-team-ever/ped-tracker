import {
  FETCH_USER_FAILURE,
  FETCH_USER_BEGIN,
  FETCH_USERS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.users
      };

    default:
      return state;
  }
}
