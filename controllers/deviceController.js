const db = require("../models/index");
const devices = require("../models").devices;
const events = require("../models").events;
const sequelize = require('sequelize');
const paramsController = require("./paramsController");


async function getAllDevices(request, result){
  return await devices
    .findAll({
        include: [{
          model: db.locations,
          attributes: ["name"],
        }]
      })
    // .then(row => enrichWithStatus(row))
    .then(row => result.status(200).send(row))
    .catch(error => result.status(400).send(error));
}

function enrichWithStatus(item) {
  console.log(item);
  return {...item, status_label: paramsController.status[item.status]};
}

async function createDevice(request, result){
  return await devices
    .create({
      brand: request.body.device.brand,
      model: request.body.device.model,
      serial_nr: request.body.device.serial_nr,
      tid: request.body.device.tid,
      location_id: request.body.device.location_id,
      till_label: request.body.device.till_label,
      status: request.body.device.status,
      security_bag_sn: request.body.device.security_bag_sn,
      last_inspection_date: request.body.device.last_inspection_date
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
        brand: request.body.device.brand || data.brand,
        model: request.body.device.model || data.model,
        serial_nr: request.body.device.serial_nr || data.serial_nr,
        tid: request.body.device.tid || data.tid,
        location_id: request.body.device.location_id || data.location_id,
        till_label: request.body.device.till_label || data.till_label,
        status: request.body.device.status || data.status,
        security_bag_sn: request.body.device.security_bag_sn || data.security_bag_sn,
        last_inspection_date: request.body.device.last_inspection_date || data.last_inspection_date
      });

      const dataChanged = data.changed();
      if (dataChanged.length > 0) {
        const message = dataChanged.map(key => (`${key}:(${data.previous(key)})=>(${data.getDataValue(key)})`));
        db.events.create({
          location_id: request.body.device.location_id,
          device_id: request.body.device.id,
          user_id: request.body.userId,
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


async function getCountStatus(request, result){
  return await devices
    .findAll({
        attributes: ['status',[sequelize.fn('COUNT', '*'),'count']],
        group: 'status',
        order: [['status', 'ASC']]
    })
    .then(row => {
      console.log(row);
      result.status(200).send(row)})
    .catch(error => result.status(400).send(error));
}

async function getAllDevicesByLocationId(request, result){
  return await db.devices
    .findAll({
      where: {
        location_id: request.params.id
      }
    })
    .then(data => result.status(200).send(data))
    .catch(error => result.status(400).send(error));
}

module.exports = {
  getAllDevices: getAllDevices,
  createDevice: createDevice,
  updateDevice: updateDevice,
  findDeviceById: findDeviceById,
  getCountStatus: getCountStatus,
  getAllDevicesByLocationId: getAllDevicesByLocationId,
}
