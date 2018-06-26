import { addLocation } from "../actions/locationsAction"
import {BASE_API} from "../actions/actionTypes";

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