const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../src/router");
const app = express();

// * Cors
app.use(cors());

// * Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// * Api routes
app.use("/api", routes);

module.exports = app
