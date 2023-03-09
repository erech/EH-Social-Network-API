const express = require("express");
const apiRoutes = require("./api");

const app = express();



app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).send("<h1>Page not found (404)</h1>");
});

module.exports = app;