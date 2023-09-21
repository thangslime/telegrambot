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

app.post('/webhook', async (req, res) => {
    const body = req.body.message;
    console.log(body);
    const teleToken = req.query.token;
    if (body.new_chat_member) {
      const newMember = body.new_chat_member;
      const data = {
        chat_id: `@${body.chat.username}`,
        text: `Hi <i><b>${parseUsername(newMember.first_name, newMember.last_name)}</b></i>,\nChào mừng bạn đến với <strong>${body.chat.title}</strong>.\nChúc bạn may mắn.`,
        parse_mode: "HTML"
      };

      await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_APIKEY || '6547009775:AAHu9R8o27SiqKBfe4qY9RPWH5CdtzB2kl8'}/sendMessage`,
        data
      );
    }
  res.status(200).json({success: true, dataBody: req.body})
})

app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT} `)
  })
// Export the Express API
module.exports = app