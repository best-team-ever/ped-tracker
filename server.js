const express = require("express");
const fetch = require("node-fetch");
const eventsController = require("./controllers/eventsController");
const locationsController = require("./controllers/locationsController");
const deviceController = require("./controllers/deviceController");
const userController = require("./controllers/userController");
// if (process.env.NODE_ENV !== "production") {
//   const path = require("path");
//   require("dotenv").config({ path: path.resolve(process.cwd(), "config/.env.local") });
// }
const app = express();
const {OAuth2Client} = require('google-auth-library');

app.use(function(req, res, next) {
  //Put an origin here, * means everything which is bad.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  //Needed by ExpressJS
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/static", express.static("./build/static"));



const ROOT_API = "/api/"

/**
 * API: retrieve one data by id with events associated
 */
app.get(`${ROOT_API}locations/:id/events`, (request, result) => {
  eventsController.getAllEventsByLocationId(request, result)
});
app.get(`${ROOT_API}users/:id/events`, (request, result) => {
  eventsController.getAllEventsByUserId(request, result)
});
app.get(`${ROOT_API}devices/:id/events`, (request, result) => {
  eventsController.getAllEventsByDeviceId(request, result)
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
  }
);
/////// GOOGLE Connect back end ////////

/**
 * API: create new data
 */
app.post("/api/locations", (request, result) => {
  locationsController.createLocation(request, result)
});
app.post("/api/user", (request, result) => {
  userController.createUser(request, result)
});
app.post("/api/device", (request, result) => {
  userController.createDevice(request, result)
});
app.post("/api/event", (request, result) => {
  userController.createEvent(request, result)
});
app.get("*", (request, result) => {
  result.sendFile(path.resolve("./build/index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
