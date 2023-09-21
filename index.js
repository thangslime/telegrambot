// index.js
const express = require('express')
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express()
const PORT = 8443

// * Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.post('/webhook', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({success: true, dataBody: req.body})
})

app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT} `)
  })
// Export the Express API
module.exports = app