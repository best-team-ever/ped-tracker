import {
  FETCH_DEVICE_FAILURE,
  FETCH_DEVICE_BEGIN,
  FETCH_DEVICE_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  item: {
    "id": null,
    "brand": "",
    "model": "",
    "serial_nr": "000-000-000",
    "tid": "",
    "location_id": null,
    "till_label": "",
    "status": "",
    "security_bag_sn": "",
    "last_inspection_date": null,
    "createdAt": null,
    "updatedAt": null
  },
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
        item: initialState.item
      };

    case FETCH_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload.device
      };

    default:
      return state;
  }
}
