import {
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USER_BEGIN,
  FETCH_USER_NEW,
  USER_ONCHANGE,
  FETCH_USER_UPDATE
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  item: {
    "id": null,
    "first_name": "",
    "last_name": "",
    "email": "",
    "p2pe_agreement": false,
    "language": "EN",
    "role": "cashier",
    "location_id": "",
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
        error: action.payload.error
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

    case FETCH_USER_UPDATE:
      return {
        ...state,
        item: action.payload.user
      };

    case USER_ONCHANGE:
      return {
        ...state,
        item: {...state.item, [action.payload.key]: action.payload.value}
      };

    default:
      return state;
  }
}
