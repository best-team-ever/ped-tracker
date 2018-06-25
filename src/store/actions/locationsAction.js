import {
  BASE_API,
  FETCH_LOCATIONS_ADD,
  FETCH_LOCATIONS_BEGIN,
  FETCH_LOCATIONS_DELETE,
  FETCH_LOCATIONS_FAILURE,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_UPDATE,
  FETCH_LOCATION_BEGIN,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE
} from "./actionTypes";

export const fetchLocationsBegin = () =>  ({
  type: FETCH_LOCATIONS_BEGIN
});

export const fetchLocationsSuccess = locations => ({
  type: FETCH_LOCATIONS_SUCCESS,
  payload: { locations }
});

export const fetchLocationsError = error => ({
  type: FETCH_LOCATIONS_FAILURE,
  payload: { error }
});

export const fetchLocationBegin = () =>  ({
  type: FETCH_LOCATION_BEGIN
});

export const fetchLocationSuccess = location => ({
  type: FETCH_LOCATION_SUCCESS,
  payload: { location }
});

export const fetchLocationError = error => ({
  type: FETCH_LOCATION_FAILURE,
  payload: { error }
});

export function fetchLocations(conditions) {
  let query = "";
  if (conditions) {
    query = "?";
    if (conditions.fields) {
      query += `fields=${conditions.fields}`;
    }
  }

  return dispatch => {
    dispatch(fetchLocationsBegin());
    return fetch(`${BASE_API}locations${query}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const sorted = json.sort( (a, b) => (a.name.localeCompare(b.name)));
        return dispatch(fetchLocationsSuccess(sorted));
      })
      .catch(error => dispatch(fetchLocationsError(error)));
  }
}

export function fetchLocation(id) {
  return dispatch => {
    dispatch(fetchLocationBegin());
    return fetch(`${BASE_API}locations/${id}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        return dispatch(fetchLocationSuccess(json));
      })
      .catch(error => dispatch(fetchLocationError(error)));
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const addLocation = (newLocation) => ({
  type: FETCH_LOCATIONS_ADD,
  payload: newLocation
});

export const updateLocation = (updatedLocation) => ({
  type: FETCH_LOCATIONS_UPDATE,
  payload: updatedLocation
});

export const deleteLocation = (id) => ({
  type: FETCH_LOCATIONS_DELETE,
  payload: id
})
