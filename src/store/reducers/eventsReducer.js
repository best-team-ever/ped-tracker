import {
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_BEGIN,
  FETCH_EVENTS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_EVENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.payload.events
      };

    default:
      return state;
  }
}
