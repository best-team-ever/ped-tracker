import {
  addLocation, changeLocationStatus,
  fetchLocationBegin,
  fetchLocationError,
  fetchLocationSuccess,
  newLocation, updateLocation
} from "../actions/locationsAction"
import { BASE_API } from "../actions/actionTypes";

export async function handleFetchAddLocation(newLocation, dispatch) {
  return await fetch(`${BASE_API}location`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      location_type: newLocation.location_type,
      name: newLocation.name,
      site_id: newLocation.site_id,
      address: newLocation.address,
      country: newLocation.country,
      contact_name: newLocation.contact_name,
      contact_position: newLocation.contact_position,
      contact_phone: newLocation.contact_phone,
      contact_email: newLocation.contact_email,
      status: newLocation.status
    })
  })
    .then(res => res.json())
    .then(json => {
      return dispatch(addLocation(json))
    })
    .catch(error => console.log(error));
}

export function handleGetLocation(id, dispatch){
  if (id !== undefined) {
    dispatch(fetchLocationBegin());
    return fetch(`${BASE_API}locations/${id}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        return dispatch(fetchLocationSuccess(json));
      })
      .catch(error => dispatch(fetchLocationError(error)));
  }else {
    return dispatch(newLocation());
  }
}

export function handleLocationStatus(key,value,dispatch){
  return dispatch(changeLocationStatus(key, value));
}

export async function handleFetchUpdateLocation(updatedLocation, dispatch){
  return await fetch(`${BASE_API}locations/${updatedLocation.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      location_type: updatedLocation.location_type,
      name: updatedLocation.name,
      site_id: updatedLocation.site_id,
      address: updatedLocation.address,
      country: updatedLocation.country,
      contact_name: updatedLocation.contact_name,
      contact_position: updatedLocation.contact_position,
      contact_phone: updatedLocation.contact_phone,
      contact_email: updatedLocation.contact_email,
      status: updatedLocation.status
    })
  })
    .then(res => res.json())
    .then(json => {
      return dispatch(updateLocation(json))
    })
    .catch(error => console.log(error));
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}