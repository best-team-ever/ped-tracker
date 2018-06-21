import {
  FETCH_DEVICE_BEGIN,
  FETCH_DEVICE_FAILURE,
  FETCH_DEVICE_SUCCESS,
  FETCH_DEVICES_SUCCESS,
} from "./actionTypes";

const urlApi = "http://localhost:8000/api/";

const fetchDeviceBegin = () => ({
  type: FETCH_DEVICE_BEGIN
});

const fetchDeviceError = error => ({
  type: FETCH_DEVICE_FAILURE,
  payload: { error }
});

const fetchDeviceSuccess = device => ({
  type: FETCH_DEVICE_SUCCESS,
  payload: { device }
});

const fetchDevicesSuccess = devices => ({
  type: FETCH_DEVICES_SUCCESS,
  payload: { devices }
});

export function fetchDevice(id) {
  return dispatch => {
    dispatch(fetchDeviceBegin);
    return fetch(`${urlApi}devices/${id}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => dispatch(fetchDeviceSuccess(json)))
      .catch(error => dispatch(fetchDeviceError(error)));
  };
}

export function fetchDevices() {
  return dispatch => {
    dispatch(fetchDeviceBegin);
    return fetch(`${urlApi}devices`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const sorted = json.sort( (a, b) => (a.serial_nr.localeCompare(b.serial_nr)));
        return dispatch(fetchDevicesSuccess(sorted));
      })
      .catch(error => dispatch(fetchDeviceError(error)));
  };
}

export function fetchDeviceAdd() {
  return dispatch => {
    console.log("fetchDeviceAdd");
    return null;
  };
}

export function fetchDeviceUpdate() {
  return dispatch => {
    console.log("fetchDeviceUpdate");
    return null;
  };
}

export function fetchDeviceDelete() {
  return dispatch => {
    console.log("fetchDeviceDelete");
    return null;
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
