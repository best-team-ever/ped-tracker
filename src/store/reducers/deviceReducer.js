import {
  FETCH_DEVICE_FAILURE,
  FETCH_DEVICE_SUCCESS,
  FETCH_DEVICE_BEGIN
} from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DEVICE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.devices
      };

    case FETCH_DEVICE_FAILURE:
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
