import {
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USER_BEGIN,
  FETCH_USER_NEW,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  item: {
    "id": null,
    "first_name": "",
    "last_name": "",
    "email": "",
    "p2pe_agreement": 0,
    "language": "",
    "role": "",
    "location_id": null,
    "createdAt": null,
    "updatedAt": null
  },
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
        item: initialState.item
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload.user
      };

    case FETCH_USER_NEW:
      return {
        ...state,
        item: initialState.item
      };

    default:
      return state;
  }
}
