import {
  fetchDeviceAdd,
  fetchDeviceUpdate,
  fetchDeviceDelete,
} from "../actions/device";


export function fetchDeviceAdd(device, dispatch) {
  console.log("fetchDeviceAdd");
  dispatch(fetchDeviceAdd(device));
}

export function fetchDeviceUpdate(device, dispatch) {
  console.log("fetchDeviceUpdate");
  dispatch(fetchDeviceUpdate(device));
}

export function fetchDeviceDelete(device, dispatch) {
  console.log("fetchDeviceDelete");
  dispatch(fetchDeviceDelete(device));
}
