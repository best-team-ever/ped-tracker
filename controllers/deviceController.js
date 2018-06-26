const db = require("../models/index");
const devices = require("../models").devices;
const events = require("../models").events;

async function getAllDevices(request, result){
  return await devices
    .findAll({
        include: [{
          model: db.locations,
          attributes: ["name"],
        }]
      })
    .then(row => result.status(200).send(row))
    .catch(error => result.status(400).send(error));
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
      data.set({
        brand: request.body.brand || data.brand,
        model: request.body.model || data.model,
        serial_nr: request.body.serial_nr || data.serial_nr,
        tid: request.body.tid || data.tid,
        location_id: request.body.location_id || data.location_id,
        till_label: request.body.till_label || data.till_label,
        status: request.body.status || data.status,
        security_bag_sn: request.body.security_bag_sn || data.security_bag_sn,
        last_inspection_date: request.body.last_inspection_date || data.last_inspection_date
      });

      const dataChanged = data.changed();
      if (dataChanged.length > 0) {
        const message = dataChanged.map(key => (`${key}:(${data.previous(key)})=>(${data.getDataValue(key)})`));
        db.events.create({
          location_id: request.body.location_id,
          device_id: request.body.id,
          user_id: "40dc09ad-c035-47cf-8587-8622c4319d86",
          message: message.join(";")
        });
      }

      return data.save()
      .then((value) => result.status(200).send(value))
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
