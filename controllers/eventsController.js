const db = require("../models/index")

async function getAllEvents(request, result){
  console.log(request.query);
  let where = {};
  if (request.query.location) {
    where = {...where, location_id: request.query.location}
  }
  if (request.query.device) {
    where = {...where, device_id: request.query.device}
  }
  if (request.query.user) {
    where = {...where, user_id: request.query.user}
  }
  return await db.events
    .findAll({
      where: where,
      include: [
        { model: db.devices, attributes: ["serial_nr"] },
        { model: db.locations, attributes: ["name"] },
        { model: db.users, attributes: ["first_name", "last_name"] },
      ]
    })
    .then(data => result.status(200).send(data))
    .catch(
      error => result.status(400).send(error)
    );
}

async function getAllEventsByLocationId(request, result){
  console.log("request.params.id: ",request.params.id);
  return await db.events
    .findAll({
      where: {
        location_id: request.params.id
      },
      include: [{
        model: db.devices,
        attributes: ["brand", "model", "serial_nr", "tid", "till_label", "status", "security_bag_sn", "last_inspection_date"],
      }]
    })
    .then(data => result.status(200).send(data))
    .catch(
      error => result.status(400).send(error)
    );
}

module.exports = {
  getAllEventsByLocationId: getAllEventsByLocationId,
  getAllEvents: getAllEvents
}
