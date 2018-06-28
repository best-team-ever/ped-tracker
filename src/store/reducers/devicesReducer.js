import {
  FETCH_DEVICE_FAILURE,
  FETCH_DEVICE_BEGIN,
  FETCH_DEVICES_SUCCESS,
  DEVICES_ONCHANGE
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

    case DEVICES_ONCHANGE:
      const newItems = state.items.map((item) =>
        (item.id === action.payload.id
        ? {...item, [action.payload.field]: action.payload.value}
        : item)
      );
      // console.log(newItems);
      return {
        ...state,
        items: newItems
      };

    default:
      return state;
  }
}
