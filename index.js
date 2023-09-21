// index.js
const express = require('express')
const axios = require("axios");

const app = express()
const PORT = 8443

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.post('/webhook', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({success: true})
})

// Export the Express API
module.exports = app