import {
  FETCH_LOCATION_BEGIN,
  FETCH_LOCATION_FAILURE,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_ADD,
  FETCH_LOCATION_UPDATE,
  FETCH_LOCATION_DELETE
} from "../actions/actionTypes";

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
        items: [...newArray]
      };

    case FETCH_LOCATION_DELETE:
      return {
        ...state,
        items: state.items.filter(({id}) => action.payload.id !== id)
      };
    default:
      return state;
  }
}