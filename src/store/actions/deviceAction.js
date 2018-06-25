import {
  BASE_API,
  FETCH_DEVICE_BEGIN,
  FETCH_DEVICE_FAILURE,
  FETCH_DEVICE_SUCCESS,
  FETCH_DEVICES_SUCCESS,
  FETCH_DEVICE_NEW,
  DEVICE_ONCHANGE
} from "./actionTypes";

export function handleDeviceChange(id, value) {
  return dispatch => {dispatch({type: DEVICE_ONCHANGE, payload: {key: id, value: value}})};
}

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

export const newDevice = (device) => ({
  type: FETCH_DEVICE_NEW,
  payload: { device }
});

export function fetchDevice(id) {
  return dispatch => {
    dispatch(fetchDeviceBegin);
    return fetch(`${BASE_API}devices/${id}`)
      .then(res => res.json())
      .then(json => dispatch(fetchDeviceSuccess(json)))
      .catch(error => dispatch(fetchDeviceError(error)));
  };
}

export function fetchDevices() {
  return dispatch => {
    dispatch(fetchDeviceBegin);
    return fetch(`${BASE_API}devices`)
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
