const fs = require('fs');
const parse = require('csv-parse');
const db = require("../models/index")

function uploadLocations(request, result){
  if (request.file !== undefined) {
    const tmp_path = request.file.path;
    const parse = parseCSV(tmp_path, addLocation);
    result.json(`import is done`);
    // result.json(`done with ${parse.lines} lines, ${parse.skipped_line_count} skipped`);
  } else {
    result.json(`empty file`);
  }
}

function uploadDevices(request, result){
  if (request.file !== undefined) {
    const tmp_path = request.file.path;
    const parse = parseCSV(tmp_path, addDevice)
    result.json(`import is done`);
  } else {
    result.json(`empty file`);
  }
}

function addLocation(data) {
  db.locations.findOrCreate(
  {
    where: {
      name: data[0]
    },
    defaults: {
      location_type: "store",
      name: data[0],
      site_id: data[1],
      address: data[2],
      country: data[3],
      contact_name: [data[4], data[5]].join(" "),
      contact_position: data[6],
      contact_phone: data[7],
      contact_email: data[8],
      status: data[9]
    }
  })
  .spread((locations, created) => {
    return created;
  })
}

function addDevice(data) {
  if (data[2]) {
    db.locations.findOne({
      where: {name: data[4], site_id: data[5]},
      attributes: ['id']
    })
    .then(location => {
      db.devices.findOrCreate(
      {
        where: {
          serial_nr: data[2]
        },
        defaults: {
          brand: data[0],
          model: data[1],
          serial_nr: data[2],
          tid: data[3],
          location_id: location ? location.id : null,
          till_label: data[6],
          status: data[7] ? data[7].toLowerCase() : "wait",
        }
      })
      .spread((locations, created) => {
        return created;
      })
    });
  }
  return false;
}

async function parseCSV(file, func) {
  return await fs.createReadStream(file)
  .pipe(parse({
    delimiter: ",",
    quote: '"',
    trim: true,
    header: true,
    skip_lines_with_error: true
  }))
  .on("data", (csvrow) => func(csvrow))
  .on("end", () => {
    fs.close;
    fs.unlinkSync(file);
  });
}

module.exports = {
  uploadDevices: uploadDevices,
  uploadLocations: uploadLocations,
}
