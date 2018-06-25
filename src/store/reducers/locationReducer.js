import {
  FETCH_LOCATION_BEGIN,
  FETCH_LOCATION_FAILURE,
  FETCH_LOCATION_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  item: {
    name: "",
    address: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
    status: ""
  }
};

export default (state=initialState, action) => {
  switch (action.type){
    case FETCH_LOCATION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        item: initialState.item
      };
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        item: action.payload.location
      };
    default:
      return state;
  }
}
