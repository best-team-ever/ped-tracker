const express = require("express");
const locationController = require("./controllers/locationController");
const deviceController = require("./controllers/deviceController");
const path = require("path");
// if (process.env.NODE_ENV !== "production") {
//   const path = require("path");
//   require("dotenv").config({ path: path.resolve(process.cwd(), "config/.env.local") });
// }

const app = express();

app.use(require("body-parser").urlencoded({ extended: false }));
app.use(require("body-parser").json());

app.use("/static", express.static("./build/static"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.get("*", (request, result) => {
//   result.sendFile(path.resolve("./build/index.html"));
// });

// app.use("/public/images", express.static(path.join(__dirname, "public/images")));

/**
 * API: retrieve list of locations
 */
app.get("/api/locations", (request, result) => {
  locationController.getAllLocations(request, result);
});

/**
 * API: create new location
 */
app.post("/api/locations", (request, result) => {
  locationController.createLocation(request, result)
});


/**
 * API: retrieve one location by id
 */
app.get("/api/locations/:id/events", (request, result) => {
  locationController.findLocationById(request, result)
})

/**
 * API: update one location by id
 */
app.put("/api/locations/:id/events", (request, result) => {
  locationController.updateLocation(request, result)
})

/**
 * API: retrieve list of devices
 */
app.get("/api/devices", (request, result) => {
  deviceController.getAllDevices(request, result);
});

/**
 * API: create new device
 */
app.post("/api/devices", (request, result) => {
  deviceController.createDevice(request, result)
});


/**
 * API: retrieve one device by id
 */
app.get("/api/devices/:id", (request, result) => {
  deviceController.findDeviceById(request, result)
})

/**
 * API: update one location by id
 */
app.put("/api/devices/:id", (request, result) => {
  locationController.updateDevice(request, result)
})


const port = process.env.PORT || 8000

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
