const express = require("express");
const locationsController = require("./controllers/locationsController");
const eventsController = require("./controllers/eventsController");
// const path = require("path");
// if (process.env.NODE_ENV !== "production") {
//   const path = require("path");
//   require("dotenv").config({ path: path.resolve(process.cwd(), "config/.env.local") });
// }

const app = express();

app.use(require("body-parser").urlencoded({ extended: false }));

app.use(require("body-parser").json());

app.use("/static", express.static("./build/static"));
// app.get("*", (request, result) => {
//   result.sendFile(path.resolve("./build/index.html"));
// });

// app.use("/public/images", express.static(path.join(__dirname, "public/images")));

/**
 * API: retrieve list
 */
app.get("/api/locations", (request, result) => {
  locationsController.getAllLocations(request, result);
});

app.get("/api/locations/:id/events", (request, result) => {
  eventsController.getAllEventsByLocationId(request, result)
})

/**
 * API: create new data
 */
app.post("/api/locations", (request, result) => {
  locationsController.createLocation(request, result)
});


/**
 * API: retrieve one data by id
 */
app.get("/api/locations/:id", (request, result) => {
  locationsController.findLocationById(request, result)
})

/**
 * API: update one data by id
 */
app.put("/api/locations/:id", (request, result) => {
  locationsController.updateLocation(request, result)
})


const port = process.env.PORT || 8000

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});