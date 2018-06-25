import {
  FETCH_LOCATIONS_ADD,
  FETCH_LOCATIONS_BEGIN, FETCH_LOCATIONS_DELETE,
  FETCH_LOCATIONS_FAILURE,
  FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_UPDATE
} from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.locations
      };

    case FETCH_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}