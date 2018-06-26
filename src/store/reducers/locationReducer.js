import {
  FETCH_LOCATION_BEGIN,
  FETCH_LOCATION_FAILURE,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_ADD,
  FETCH_LOCATION_UPDATE,
  FETCH_LOCATION_DELETE, FETCH_LOCATION_NEW
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  item: {
    location_type: "",
    name: "",
    site_id: "",
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
    case FETCH_LOCATION_ADD:
      return {
        ...state,
        items: [ action.payload.newLocation, ...state.items ]
      };

    case FETCH_LOCATION_UPDATE:
      const newArray = state.items.map((item) => {
        if (item.id === action.payload.updatedLocation.id){
          return {
            item: action.payload.updatedLocation
          }
        }
        return item;
      })

      return {
        ...state,
        item: [...newArray]
      };

    case FETCH_LOCATION_DELETE:
      return {
        ...state,
        item: state.items.filter(({id}) => action.payload.id !== id)
      };

    case FETCH_LOCATION_NEW:
      return {
        ...state,
        item: initialState.item
      }
    default:
      return state;
  }
}
