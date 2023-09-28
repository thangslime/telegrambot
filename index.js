// index.js
const TelegramBot = require('node-telegram-bot-api');
// Create a bot instance
const bot = new TelegramBot(process.env.BOT_APIKEY || "6468513372:AAFVyJWK7R0lQ5CkYGPf0-t_hAR_qgjOF1o");

// Create a web hook URL
const webhookURL = 'https://telegrambot-gamma-ten.vercel.app/webhook';

// Register the web hook with Telegram
bot.setWebHook(webhookURL);
// server setup
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8443;
const { handleEvent } = require('./src/telebot')
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
    bot.processUpdate(req.body);
    res.status(200).json({ success: true, dataBody: req.body });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});
// Export the Express API

bot.on('callback_query', callbackQuery => {
  // Get the callback_data
  const opts = {
    chat_id: callbackQuery.message.chat.id,
  };
  switch (callbackQuery.data) {
    case 'support':
      bot.sendMessage(opts.chat_id, `Hỏi google đê`);
      break;
    case 'nothing':
      bot.sendMessage(opts.chat_id, `Cút cút`);
      break;
    default:
        break;
  }
});

bot.on('message', message => {
  const markup = {
    inline_keyboard: [
      [
        {
          text: 'Cần hỗ trợ',
          callback_data: 'support'
        },
        {
          text: 'Không có gì',
          callback_data: 'nothing'
        }
      ]
    ]
  };

  // Send a message with the inline markup
  bot.sendMessage(message.chat.id, 'Ây dô đứa nào gọi tao?', {
    reply_markup: markup
  });
});

module.exports = app;
