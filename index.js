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
const { myWallet, checkBalance, mainMenu, importWallet } = require('./src/telebot')
// const provider = new ethers.providers.JsonRpcProvider('https://ethereum.publicnode.com');
// * Body Parser
// const server = https.createServer(app);
const fs = require('fs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`Hello Telegram Bot`);
});

const checkCommand = (msg) => {
  const commands = ['/balance', '/menu', '/import']
  let res = {
    command: '',
    check: false
  }
  commands.forEach(item => {
    if (msg.includes(item)) {
      res = {
        command: item,
        check: true
      }
    }
  })
  return res
}

app.post("/webhook", async (req, res) => {
  try {
      console.log(req.body);
      // bot.processUpdate(req.body)
      const msg = req.body.message
      if (msg) {
        if (msg.text === '/start') {
          const photo = await fs.readFileSync('./public/A3.jpg')
          bot.sendPhoto(msg.chat.id, photo, { caption: `Các lệnh có thể dùng \n/balance - Kiểm tra số dư ETH theo địa chỉ ví ví dụ: "/balance 0xgd...3hf"` })
        }
        const checkData = checkCommand(msg.text)
        if (checkData.check) {
          switch (checkData.command) {
            case '/balance':
              await checkBalance(bot, msg)
              break;
            case '/menu':
              mainMenu(bot, msg)
              break;
            case '/import':
              await importWallet(bot, msg)
              break;
            default:
              break;
          }
        }
      }
      
      res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

bot.setMyCommands([
  {
    command: '/balance',
    description: 'Send with your EVM wallet address E.G. "/balance 0x93...3fa"'
  },
  {
    command: '/menu',
    description: 'Main menu'
  },
  {
    command: '/import',
    description: 'Import wallet by Private Key E.G. "/import private_key"'
  }
])

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

// bot.onText(/\/bot/, async message => {
//   const markup = {
//     inline_keyboard: [
//       [
//         {
//           text: '💳 My Wallet',
//           callback_data: 'my_wallet'
//         },
//         {
//           text: '📥 Deposit',
//           callback_data: 'deposit'
//         }
//       ]
//     ]
//   };

//   // Send a message with the inline markup
//   await bot.sendMessage(message.chat.id, 'You are in Main Menu', {
//     reply_markup: markup
//   });
// });

// bot.onText(/\/balance/, async msg => {
//   const text = msg.text
//   const wallet = text.slice(9)
//   const chatId = msg.chat.id
//   try {
//     const isAddress = await bnbWeb3.utils.isAddress(wallet)
//     if(isAddress) {
//       const botMsg = await bot.sendMessage(chatId, 'Checking...')
//       const botMsgId = botMsg.message_id
//       const eth = await ethWeb3.eth.getBalance(wallet)
//       console.log(eth);
//       await bot.deleteMessage(chatId, botMsgId)
//       await bot.sendMessage(chatId,
//         `${bnbWeb3.utils.fromWei(eth, 'ether')} ETH`
//       ) 
//     } else {
//       await bot.sendMessage(chatId, 'This is not an address')
//     }
//   } catch (error) {
//     await bot.sendMessage(chatId, 'Something went wrong')
//   }
// });

// bot.on('message', async msg => {
//   const text = msg.text
//   const chatId = msg.chat.id
//   // if (message.text.includes('Private Key')) {
//   //   importWallet(bot, message.chat.id, message, provider)
//   // }
//   try {
//     const isAddress = await bnbWeb3.utils.isAddress(text)
//     if(isAddress) {
//       const botMsg = await bot.sendMessage(chatId, 'Checking...')
//       const botMsgId = botMsg.message_id
//       const eth = await ethWeb3.eth.getBalance(text)
//       console.log(eth);
//       await bot.deleteMessage(chatId, botMsgId)
//       await bot.sendMessage(chatId,
//         `${bnbWeb3.utils.fromWei(eth, 'ether')} ETH`
//       ) 
//     } else {
//       await bot.sendMessage(chatId, 'This is not an address')
//     }
//   } catch (error) {
//     await bot.sendMessage(chatId, 'Something went wrong')
//   }
// });

