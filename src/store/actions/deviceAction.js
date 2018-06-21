import {
  FETCH_DEVICE_BEGIN,
  FETCH_DEVICE_SUCCESS,
  FETCH_DEVICE_FAILURE,
  FETCH_DEVICE_ADD,
  FETCH_DEVICE_UPDATE,
  FETCH_DEVICE_DELETE,
} from "./actionTypes";

const urlApi = "http://localhost:8000/api/";

export const fetchDevicesBegin = () => ({
  type: FETCH_DEVICE_BEGIN
});

export const fetchDevicesSuccess = devices => ({
  type: FETCH_DEVICE_SUCCESS,
  payload: { devices }
});

export const fetchDevicesError = error => ({
  type: FETCH_DEVICE_FAILURE,
  payload: { error }
});

export function fetchDevices() {
  console.log("fetchDevices");
  return dispatch => {
    dispatch(fetchDevicesBegin);
    return fetch(`${urlApi}devices`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const sorted = json.sort( (a, b) => (a.serial_nr.localeCompare(b.serial_nr)));
        return dispatch(fetchDevicesSuccess(sorted));
      })
      .catch(error => dispatch(fetchDevicesError(error)));
  };
}

export function fetchDeviceAdd() {
  return dispatch => {
    console.log("fetchDeviceAdd");
    return null
  };
}

export function fetchDeviceUpdate() {
  return dispatch => {
    console.log("fetchDeviceUpdate");
    return null
  };
}

export function fetchDeviceDelete() {
  return dispatch => {
    console.log("fetchDeviceDelete");
    return null
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
