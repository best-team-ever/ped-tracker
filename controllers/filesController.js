const fs = require('fs');
const parse = require('csv-parse');

function uploadDevices(request, result){
  const tmp_path = request.file.path;
  parseCSV(tmp_path);
  result.json("done");
}

function uploadLocations(request, result){
  const tmp_path = request.file.path;
  parseCSV(tmp_path);
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
}
