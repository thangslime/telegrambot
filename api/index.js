const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./router");
const app = express();

// * Cors
app.use(cors());

// * Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// * Api routes
app.use("/api", routes);

let PORT = process.env.PORT || 8443;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

module.exports = app
