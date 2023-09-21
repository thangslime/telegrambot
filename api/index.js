const express = require("express");
const app = express();

// * Api routes
app.get('/test', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: 1`);
});

app.post('/webhook', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(res.body);
})

module.exports = app
