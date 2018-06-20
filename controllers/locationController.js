const locations = require("../models").locations;

async function getAllLocations(request, result){
  return await locations
    .findAll()
    .then(row => result.status(200).send(row))
    .catch(
      error => result.status(400).send(error)
    );
}

async function createLocation(request, result){
  return await locations
    .create({
      location_type: request.body.location_type,
      name: request.body.name,
      address: request.body.address,
      country: request.body.country,
      contact_name: request.body.contact_name,
      contact_position: request.body.contact_position,
      contact_phone: request.body.contact_phone,
      contact_email: request.body.contact_email,
      status: request.body.status
    })
    .then(row => result.status(201).send(row))
    .catch(error => result.status(400).send(error));
}

async function updateLocation(request, result){
  return await locations
    .findById(request.params.id)
    .then(data => {
      if (!data) {
        return result.status(404).send({
          message: "no location"
        })
      }
      return data
        .update({
          location_type: request.body.location_type || data.location_type,
          name: request.body.name || data.name,
          address: request.body.address || data.address,
          country: request.body.country || data.country,
          contact_name: request.body.contact_name || data.contact_name,
          contact_position: request.body.contact_position || data.contact_position,
          contact_phone: request.body.contact_phone || data.contact_phone,
          contact_email: request.body.contact_email || data.contact_email,
          status: request.body.status || data.status
        })
        .then(() => result.status(200).send(data))
        .catch((error) => result.status(400).send(error));
    })
    .catch((error) => result.status(400).send(error));
}

async function findLocationById(request, result){
  return await locations
    .findById(request.params.id)
    .then(data => {
      if (!data){
        return result.status(404).send({
          message: "location not found"
        })
      }
      return result.status(200).send(data)
    })
    .catch(error => result.status(400).send(error));
}


module.exports = {
  getAllLocations: getAllLocations,
  createLocation: createLocation,
  updateLocation: updateLocation,
  findLocationById: findLocationById
}