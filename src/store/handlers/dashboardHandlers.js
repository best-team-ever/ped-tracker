import {
  fetchDevicesStatus,
  fetchActiveDevices,
  fetchInActiveDevices,
} from "../actions/dashboardAction";

export function fetchDevicesStatusHandler(dispatch) {
  dispatch(fetchDevicesStatus());
}

export function fetchActiveDevicesHandler(dispatch) {
  dispatch(fetchActiveDevices("active"));
}

export function fetchInActiveDevicesHandler(dispatch) {
  dispatch(fetchInActiveDevices("active"));
}
