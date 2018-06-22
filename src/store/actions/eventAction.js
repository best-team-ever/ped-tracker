import {
  BASE_API,
  FETCH_EVENTS_BEGIN,
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_SUCCESS,
} from "./actionTypes";

const fetchEventsBegin = () => ({
  type: FETCH_EVENTS_BEGIN
});

const fetchEventsError = error => ({
  type: FETCH_EVENTS_FAILURE,
  payload: { error }
});

const fetchEventsSuccess = events => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: { events }
});

export function fetchEvents() {
  return dispatch => {
    dispatch(fetchEventsBegin);
    return fetch(`${BASE_API}events`)
      .then(res => res.json())
      .then(json => dispatch(fetchEventsSuccess(json)))
      .catch(error => dispatch(fetchEventsError(error)));
  };
}
