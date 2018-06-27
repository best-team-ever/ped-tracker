const express = require("express");
const fetch = require("node-fetch");
const eventsController = require("./controllers/eventsController");
const locationsController = require("./controllers/locationsController");
const deviceController = require("./controllers/deviceController");
const userController = require("./controllers/userController");
const paramsController = require("./controllers/paramsController");
const loginController = require("./controllers/loginController");
const bodyParser = require("body-parser");
const path = require("path");
// if (process.env.NODE_ENV !== "production") {
//   const path = require("path");
//   require("dotenv").config({ path: path.resolve(process.cwd(), "config/.env.local") });
// }
const app = express();
const {OAuth2Client} = require('google-auth-library');

const multer  = require("multer");
const upload = multer({ dest: path.join(__dirname, "uploads/") });
const fs = require('fs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * API: retrieve one data by id with events associated
 */
app.get("/api/locations/:id/events", (request, result) => {
  eventsController.getAllEventsByLocationId(request, result)
});
app.get("/api/users/:id/events", (request, result) => {
  eventsController.getAllEventsByUserId(request, result)
});
app.get("/api/devices/:id/events", (request, result) => {
  eventsController.getAllEventsByDeviceId(request, result)
});

/**
 * API: retrieve one data by id with devices associated
 */
app.get("/api/locations/:id/devices", (request, result) => {
  deviceController.getAllDevicesByLocationId(request, result)
});

/**
 * API: retrieve params
 */
app.get("/api/status", (request, result) => {
  paramsController.getStatus(request, result)
});

/**
 * API: retrieve one data by id
 */
app.get("/api/locations/:id", (request, result) => {
  locationsController.findLocationById(request, result)
});
app.get("/api/users/:id", (request, result) => {
  userController.findUserById(request, result)
});
app.get("/api/devices/:id", (request, result) => {
  deviceController.findDeviceById(request, result)
});

/**
 * API: retrieve list
 */
app.get("/api/locations", (request, result) => {
  locationsController.getAllLocations(request, result);
});
app.get("/api/users", (request, result) => {
  userController.getAllUsers(request, result);
});
app.get("/api/devices", (request, result) => {
  deviceController.getAllDevices(request, result);
});
app.get("/api/events", (request, result) => {
  eventsController.getAllEvents(request, result)
});
app.get("/api/devicesStatus", (request, result) => {
  deviceController.getCountStatus(request, result);
});

/**
 * API: update one data by id
 */
app.put("/api/locations/:id", (request, result) => {
  locationsController.updateLocation(request, result)
});
app.put("/api/users/:id", (request, result) => {
  userController.updateUser(request, result)
});
app.put("/api/devices/:id", (request, result) => {
  deviceController.updateDevice(request, result)
});

/////// GOOGLE Connect back ////////
app.post('/googleConnectBack', (request, result) => {
  const tokenId = request.headers.authorization;

  fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.aud === process.env.REACT_APP_API_USER) {
        userController.findUserByEmail(data.email, result)
      } else {
        return "Bad token"
      }
    })
    .catch((error) => {console.warn("Error server: ", error)})

});
/////// GOOGLE Connect back end ////////

/**
 * API: create new data
 */
app.post("/api/location", (request, result) => {
  locationsController.createLocation(request, result)
});
app.post("/api/user", (request, result) => {
  userController.createUser(request, result)
});
app.post("/api/device", (request, result) => {
  deviceController.createDevice(request, result)
});

//--- Upload files
const type = upload.single('file');
app.post("/api/upload-devices", type, (request, result) => {
  filesController.uploadDevices(request, result);
});
app.post("/api/upload-locations", type, (request, result) => {
  filesController.uploadLocations(request, result);
});

app.use(express.static("./build"));

app.get("*", (request, result) => {
  result.sendFile(path.resolve("./build/index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
