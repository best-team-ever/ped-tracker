import {
  BASE_API,
  FETCH_LOCATIONS_BEGIN,
  FETCH_LOCATIONS_FAILURE,
  FETCH_LOCATIONS_SUCCESS
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

export function fetchLocations() {
  return dispatch => {
    dispatch(fetchLocationsBegin());
    return fetch(`${BASE_API}/locations`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const sorted = json.sort( (a, b) => (a.name.localeCompare(b.name)));
        return dispatch(fetchLocationsSuccess(sorted));
      })
      .catch(error => dispatch(fetchLocationsError(error)));
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
