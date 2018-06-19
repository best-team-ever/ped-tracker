const express = require("express");
const app = express();

const path = require("path");

app.use("/static", express.static("./build/static"));

app.get("*", (request, result) => {
  result.sendFile(path.resolve("./build/index.html"));
});


const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
