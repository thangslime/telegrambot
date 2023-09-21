// index.js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8443;

// * Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.post("/webhook", async (req, res) => {
    try {
        const body = req.body.message;
        console.log(body);
        if (body.new_chat_member) {
            const newMember = body.new_chat_member;
            const user_name = `${newMember.first_name ? newMember.first_name : ""} ${
            newMember.last_name ? newMember.last_name : ""
            }`.trim();
            const data = {
            chat_id: `@${body.chat.username}`,
            text: `Hi <i><b>${user_name}</b></i>,\nChào mừng bạn đến với <strong>${body.chat.title}</strong>.\nChúc bạn may mắn.`,
            parse_mode: "HTML",
            };

            await axios.post(
            `https://api.telegram.org/bot${
                process.env.BOT_APIKEY ||
                "6468513372:AAFVyJWK7R0lQ5CkYGPf0-t_hAR_qgjOF1o"
            }/sendMessage`,
            data
            );
        } else {
            if (body.chat.type != 'private') {
                const user_name = `${body.from.first_name ? body.from.first_name : ""} ${
                    body.from.last_name ? body.from.last_name : ""
                    }`.trim();
                const data = {
                    chat_id: `@${body.chat.username}`,
                    text: `Dìa dia <i><b>${user_name}</b></i> 🤘🤘🤘!!!`,
                    parse_mode: "HTML",
                    };
        
                    await axios.post(
                    `https://api.telegram.org/bot${
                        process.env.BOT_APIKEY ||
                        "6468513372:AAFVyJWK7R0lQ5CkYGPf0-t_hAR_qgjOF1o"
                    }/sendMessage`,
                    data
                    );
            }
        }
        res.status(200).json({ success: true, dataBody: req.body });
    } catch (error) {
        console.log(error);

    }
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});
// Export the Express API
module.exports = app;
