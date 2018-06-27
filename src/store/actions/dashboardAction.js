import {
  FETCH_DEVICES_STATUS,
  FETCH_ACTIVE_DEVICES,
  FETCH_INACTIVE_DEVICES,
  FETCH_DEVICE_BEGIN,
} from "./actionTypes";

const urlServer = process.env.REACT_APP_URL_SERVER;

const fetchDeviceBegin = () => ({
  type: FETCH_DEVICE_BEGIN
});

const fetchDevicesStatusSuccess = (value) => ({
  type: FETCH_DEVICES_STATUS,
  devicesStates: value,
});

const fetchActiveDevicesSuccess = (value) => ({
  type: FETCH_ACTIVE_DEVICES,
  actives: value,
});

const fetchInActiveDevicesSuccess = (value) => ({
  type: FETCH_INACTIVE_DEVICES,
  inactives: value,
});

export const fetchDevicesStatus = (status) => {
  return dispatch => {
    dispatch(fetchDeviceBegin);
    return fetch(`${urlServer}/api/devicesStatus`)
      .then((response) => response.json())
      .then((result) => {
        return dispatch(fetchDevicesStatusSuccess(result));
      })
      .catch((error) => console.log("Error getting state", error))
  }
}

export const fetchActiveDevices = (status) => {
  return dispatch => {
    let inActive = 0
    dispatch(fetchDeviceBegin);
    return fetch(`${urlServer}/api/devicesStatus`)
      .then((response) => response.json())
      .then((result) => {
        result.map(array => {
          if (array.status === status) {
            return dispatch(fetchActiveDevicesSuccess(parseInt(array.count,10)));
          }
        })
      })
      .catch((error) => console.log("Error getting state", error))
  }
}

export const fetchInActiveDevices = (status) => {
  return dispatch => {
    let inActive = 0
    dispatch(fetchDeviceBegin);
    return fetch(`${urlServer}/api/devicesStatus`)
      .then((response) => response.json())
      .then((result) => {
        result.map(array => {
          if (array.status !== status) {
            inActive=inActive+parseInt(array.count,10);
            return dispatch(fetchInActiveDevicesSuccess(inActive));
            }
          })
        })
      .catch((error) => console.log("Error getting state", error))
  }
}
