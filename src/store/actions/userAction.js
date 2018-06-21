import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_ADD,
  FETCH_USER_UPDATE,
  FETCH_USER_DELETE,
} from "./actionTypes";

const urlApi = "http://localhost:8000/api/";

export const fetchUsersBegin = () => ({
  type: FETCH_USER_BEGIN
});

export const fetchUsersSuccess = users => ({
  type: FETCH_USER_SUCCESS,
  payload: { users }
});

export const fetchUsersError = error => ({
  type: FETCH_USER_FAILURE,
  payload: { error }
});

export function fetchUsers() {
  console.log("fetchUsers");
  return dispatch => {
    dispatch(fetchUsersBegin);
    return fetch(`${urlApi}users`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const sorted = json.sort( (a, b) => (a.last_name.localeCompare(b.last_name)));
        return dispatch(fetchUsersSuccess(sorted));
      })
      .catch(error => dispatch(fetchUsersError(error)));
  };
}

export function fetchUserAdd() {
  return dispatch => {
    console.log("fetchUserAdd");
    return null
  };
}

export function fetchUserUpdate() {
  return dispatch => {
    console.log("fetchUserUpdate");
    return null
  };
}

export function fetchUserDelete() {
  return dispatch => {
    console.log("fetchUserDelete");
    return null
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
