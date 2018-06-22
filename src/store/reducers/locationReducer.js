import {FETCH_LOCATION_BEGIN, FETCH_LOCATION_FAILURE, FETCH_LOCATION_SUCCESS} from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default (state=initialState, action) => {
  switch (action.type){
    case FETCH_LOCATION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.location
      };
    case FETCH_LOCATION_FAILURE:
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