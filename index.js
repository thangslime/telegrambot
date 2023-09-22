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
  res.send(`<html lang="en">
  <head>
      <title>NFT</title>
      <style>
          body {
            background: black;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, Helvetica, sans-serif;
          }
  
          .container {
            text-align: center;
          }
  
          .glitch {
            font-size: 5rem;
            font-weight: bold;
            text-transform: uppercase;
            position: relative;
            text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
              0.025em 0.04em 0 #fffc00;
            animation: glitch 725ms infinite;
          }
  
          .glitch span {
            position: absolute;
            top: 0;
            left: 0;
          }
  
          .glitch span:first-child {
            animation: glitch 500ms infinite;
            clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
            transform: translate(-0.04em, -0.03em);
            opacity: 0.75;
          }
  
          .glitch span:last-child {
            animation: glitch 375ms infinite;
            clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
            transform: translate(0.04em, 0.03em);
            opacity: 0.75;
          }
  
          @keyframes glitch {
            0% {
              text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                0.025em 0.04em 0 #fffc00;
            }
            15% {
              text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                0.025em 0.04em 0 #fffc00;
            }
            16% {
              text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                -0.05em -0.05em 0 #fffc00;
            }
            49% {
              text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                -0.05em -0.05em 0 #fffc00;
            }
            50% {
              text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                0 -0.04em 0 #fffc00;
            }
            99% {
              text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                0 -0.04em 0 #fffc00;
            }
            100% {
              text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
                -0.04em -0.025em 0 #fffc00;
            }
          }
      </style>
  </head>
  <body>
    <div class="container">
    <p class="glitch">
      <span aria-hidden="true">Hello</span>
      Hello
      <span aria-hidden="true">Hello</span>
    </p>
  </div>
  </body>
  </html>`);
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
      if (body.chat.type != "private") {
        const user_name = `${
          body.from.first_name ? body.from.first_name : ""
        } ${body.from.last_name ? body.from.last_name : ""}`.trim();
        const data = {
          chat_id: `@${body.chat.username}`,
          text: `Dìa dia <i><b>${user_name}</b></i> 🤘🤘🤘!!!`,
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [ { text: "Ventory", url: "https://testnet.ventory.gg/" }, { text: "Grinding", url: "https://grinding.today/" } ],
              [ { text: "Callback 1", callback: 'btn-1' }, { text: "Callback 2", callback: 'btn-2'} ],
          ]
          }
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
