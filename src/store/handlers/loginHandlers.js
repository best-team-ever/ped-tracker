import {
  fetchUserAdd,
  fetchUserUpdate,
  fetchUserDelete,
} from "../actions/userAction";


export function fetchUserAdd(user, dispatch) {
  console.log("fetchUserAdd");
  dispatch(fetchUserAdd(user));
}

export function fetchUserUpdate(user, dispatch) {
  console.log("fetchUserUpdate");
  dispatch(fetchUserUpdate(user));
}

export function fetchUserDelete(user, dispatch) {
  console.log("fetchUserDelete");
  dispatch(fetchUserDelete(user));
}
