const db = require("../models/index")

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
  getAllEventsByLocationId: getAllEventsByLocationId
}