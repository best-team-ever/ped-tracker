const fs = require('fs');
const parse = require('csv-parse');
const db = require("../models/index")

function uploadDevices(request, result){
  const tmp_path = request.file.path;
  const data = parseCSV(tmp_path);
  result.json("done");
}

function uploadLocations(request, result){
  const tmp_path = request.file.path;
  const data = parseCSV(tmp_path);
  // name;site_id;address;country;first_name;last_name;contact_position;contact_phone;contact_email
  data.foreach((row, index) => {
    if (index > 0) {
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
      })
      .spread((locations, created) => {
        console.log(locations.get({
          plain: true
        }))
        console.log(created)
      })
    }
  })
  result.json("done");
}

module.exports = {
  uploadDevices: uploadDevices,
  uploadLocations: uploadLocations,
}

function parseCSV(file) {
  let csvData = [];
  let row = 0;
  fs.createReadStream(file)
  .pipe(parse({delimiter: ';'}))
  .on('data', function(csvrow) {
    console.log("row", csvrow);
    csvData.push(csvrow);
  })
  .on('end',function() {
    fs.close;
    fs.unlinkSync(file);
  });
  return csvData;
}
