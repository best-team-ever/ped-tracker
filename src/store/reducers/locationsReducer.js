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

    case FETCH_LOCATIONS_ADD:
      return {
        ...state,
        items: [ action.payload.newLocation, ...state.locations ]
      };

    case FETCH_LOCATIONS_UPDATE:
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
      }

    case FETCH_LOCATIONS_DELETE:
      return {
        ...state,
        items: state.items.filter(({id}) => action.payload.id !== id)
      }

    default:
      return state;
  }
}