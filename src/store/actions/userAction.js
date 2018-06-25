import {
  BASE_API,
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USERS_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_NEW,
  FETCH_USER_ADD,
  FETCH_USER_UPDATE,
  FETCH_USER_DELETE,
  USER_ONCHANGE
} from "./actionTypes";

export function handleUserChange(id, value) {
  return dispatch => {dispatch({type: USER_ONCHANGE, payload: {key: id, value: value}})};
}

const fetchUsersBegin = () => ({
  type: FETCH_USER_BEGIN
});

const fetchUsersError = error => ({
  type: FETCH_USER_FAILURE,
  payload: { error }
});

const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: { user }
});

const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users }
});

export const newUser = (user) => ({
  type: FETCH_USER_NEW,
  payload: { user }
});

export function fetchUser(id) {
  return dispatch => {
    dispatch(fetchUsersBegin);
    return fetch(`${BASE_API}users/${id}`)
      .then(res => res.json())
      .then(json => dispatch(fetchUserSuccess(json)))
      .catch(error => dispatch(fetchUsersError(error)));
  };
}

export function fetchUsers() {
  return dispatch => {
    dispatch(fetchUsersBegin);
    return fetch(`${BASE_API}users`)
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
