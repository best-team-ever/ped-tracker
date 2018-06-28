import {
  BASE_API,
  FETCH_DEVICE_BEGIN,
  FETCH_DEVICE_FAILURE,
  FETCH_DEVICE_SUCCESS,
  FETCH_DEVICES_SUCCESS,
  FETCH_DEVICE_NEW,
  FETCH_DEVICE_UPDATE,
  DEVICE_ONCHANGE,
  DEVICES_ONCHANGE,
  FETCH_STATUS
} from "./actionTypes";

export function handleDeviceChange(id, value) {
  return dispatch => {dispatch({type: DEVICE_ONCHANGE, payload: {key: id, value: value}})};
}

export function handleDevicesChange(id, field, value) {
  return dispatch => {dispatch({
    type: DEVICES_ONCHANGE,
    payload: {id: id, field: field, value: value}})
  };
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

export const fetchDeviceUpdated = (device) => ({
  type: FETCH_DEVICE_UPDATE,
  payload: { device }
});

export const fetchStatusSuccess = (status) => ({
  type: FETCH_STATUS,
  payload: status
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

export function fetchDeviceUpdate(device, userId) {
  const url = (device.id === null) ? `${BASE_API}device` : `${BASE_API}devices/${device.id}`;
  const method = (device.id === null) ? "POST" : "PUT";

  return dispatch => {
    dispatch(fetchDeviceBegin());
    return fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({device: device, userId: userId})
    })
    .then(res => res.json())
    .then(json => dispatch(fetchDeviceUpdated(json)))
    .catch(error => dispatch(fetchDeviceError(error)));
  };
}

export function fetchStatus() {
  return dispatch => {
    dispatch(fetchDeviceBegin);
    return fetch(`${BASE_API}status`)
      .then(res => res.json())
      .then(json => dispatch(fetchStatusSuccess(json)))
      .catch(error => dispatch(fetchDeviceError(error)));
  };
}

export function fetchDeviceDelete() {
  return dispatch => {
    console.log("fetchDeviceDelete");
    return null;
  };
}

export function fetchLocationDevices(id) {
  return dispatch => {
    dispatch(fetchDeviceBegin);
    return fetch(`${BASE_API}locations/${id}/devices`)
      .then(res => res.json())
      .then(json => {
        const sorted = json.sort( (a, b) => (a.till_label.localeCompare(b.till_label)));
        return dispatch(fetchDevicesSuccess(sorted));
      })
      .catch(error => dispatch(fetchDeviceError(error)));
  };
}
