import {
  FETCH_DEVICE_FAILURE,
  FETCH_DEVICE_BEGIN,
  FETCH_DEVICES_SUCCESS,
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

    case FETCH_DEVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    case FETCH_DEVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.payload.devices
      };

    default:
      return state;
  }
}
