const devices = require("../models").devices;

async function getAllDevices(request, result){
  return await devices
    .findAll()
    .then(row => result.status(200).send(row))
    .catch(
      error => result.status(400).send(error)
    );
}

async function createDevice(request, result){
  return await devices
    .create({
      brand: request.body.brand,
      model: request.body.model,
      serial_nr: request.body.serial_nr,
      tid: request.body.tid,
      location_id: request.body.location_id,
      till_label: request.body.till_label,
      status: request.body.status,
      security_bag_sn: request.body.security_bag_sn,
      last_inspection_date: request.body.last_inspection_date
    })
    .then(row => result.status(201).send(row))
    .catch(error => result.status(400).send(error));
}

async function updateDevice(request, result){
  return await devices
    .findById(request.params.id)
    .then(data => {
      if (!data) {
        return result.status(404).send({
          message: "no location"
        })
      }
      return data
        .update({
          brand: request.body.brand || data.brand,
          model: request.body.model || data.model,
          serial_nr: request.body.serial_nr || data.serial_nr,
          tid: request.body.tid || data.tid,
          location_id: request.body.location_id || data.location_id,
          till_label: request.body.till_label || data.till_label,
          status: request.body.status || data.status,
          security_bag_sn: request.body.security_bag_sn || data.security_bag_sn,
          last_inspection_date: request.body.last_inspection_date || data.last_inspection_date
        })
        .then(() => result.status(200).send(data))
        .catch((error) => result.status(400).send(error));
    })
    .catch((error) => result.status(400).send(error));
}

async function findDeviceById(request, result){
  return await devices
    .findById(request.params.id)
    .then(data => {
      if (!data){
        return result.status(404).send({
          message: "device not found"
        })
      }
      return result.status(200).send(data)
    })
    .catch(error => result.status(400).send(error));
}


module.exports = {
  getAllDevices: getAllDevices,
  createDevice: createDevice,
  updateDevice: updateDevice,
  findDeviceById: findDeviceById
}
