const fs = require('fs');
const parse = require('csv-parse');

function uploadDevice(request, result){
  const tmp_path = request.file.path;
  parseCSV(tmp_path);
  result.json("done");
}

module.exports = {
  uploadDevice: uploadDevice,
}

function parseCSV(file) {
  let csvData = [];
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
