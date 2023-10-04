// index.js
const TelegramBot = require('node-telegram-bot-api');
// Create a bot instance
const bot = new TelegramBot(process.env.BOT_APIKEY || "6468513372:AAFVyJWK7R0lQ5CkYGPf0-t_hAR_qgjOF1o");

// // Create a web hook URL
const webhookURL = 'https://telegrambot-gamma-ten.vercel.app/webhook';

// // Register the web hook with Telegram
bot.setWebHook(webhookURL);
// server setup
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8443;
// const { ethers } = require("ethers");
const { myWallet, importWallet } = require('./src/telebot')
// const provider = new ethers.providers.JsonRpcProvider('https://ethereum.publicnode.com');
import Web3 from 'web3'
const ethWeb3 = new Web3('https://ethereum.publicnode.com')
const bnbWeb3 = new Web3('https://bsc-dataseed.binance.org')
// * Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`Hello Telegram Bot`);
});

app.post("/webhook", (req, res) => {
  try {
      bot.processUpdate(req.body)
      res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});
// Export the Express API
bot.on('callback_query', async callbackQuery => {
  // Get the callback_data
  const opts = {
    chat_id: callbackQuery.message.chat.id,
  };
  switch (callbackQuery.data) {
    case 'my_wallet':{
      myWallet(bot, opts.chat_id)
      break;
    }
    case 'deposit':
      bot.sendMessage(opts.chat_id, `Comming Soon`);
      break;
    case 'import_wallet': {
      bot.sendMessage(opts.chat_id, `Import your Private Key, E.g. "Private Key easd...afadf"`);
      break;
    }
    case 'menu': {
      const markup = {
        inline_keyboard: [
          [
            {
              text: '💳 My Wallet',
              callback_data: 'my_wallet'
            },
            {
              text: '📥 Deposit',
              callback_data: 'deposit'
            }
          ]
        ]
      };
      bot.sendMessage(opts.chat_id, 'You are in Main Menu', {
        reply_markup: markup
      });
      break;
    }
    default:
        break;
  }
});

bot.onText(/\/bot/, message => {
  const markup = {
    inline_keyboard: [
      [
        {
          text: '💳 My Wallet',
          callback_data: 'my_wallet'
        },
        {
          text: '📥 Deposit',
          callback_data: 'deposit'
        }
      ]
    ]
  };

  // Send a message with the inline markup
  bot.sendMessage(message.chat.id, 'You are in Main Menu', {
    reply_markup: markup
  });
});

bot.on('message', async msg => {
  const text = msg.text
  const chatId = msg.chat.id
  // if (message.text.includes('Private Key')) {
  //   importWallet(bot, message.chat.id, message, provider)
  // }
  try {
    const isAddress = await bnbWeb3.utils.isAddress(text)
    if(isAddress) {
      const botMsg = await bot.sendMessage(chatId, 'Checking...')
      const botMsgId = botMsg.message_id

      const eth = await ethWeb3.eth.getBalance(text)
      bot.deleteMessage(chatId, botMsgId)
      bot.sendMessage(chatId,
        `${bnbWeb3.utils.fromWei(eth, 'ether')} ETH`
      ) 
    } else {
      await bot.sendMessage(chatId, 'This is not an address')
    }
  } catch (error) {
    await bot.sendMessage(chatId, 'Something went wrong')
  }
});

module.exports = app;
