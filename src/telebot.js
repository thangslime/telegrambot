const { ethers } = require("ethers");
const Web3 = require('web3')
const ethWeb3 = new Web3('https://ethereum.publicnode.com')
const bnbWeb3 = new Web3('https://bsc-dataseed.binance.org')

const myWallet = async (bot, chat_id) => {
    const markup = {
        inline_keyboard: [
          [
            {
              text: 'Create New',
              callback_data: 'creat_wallet'
            },
            {
              text: 'Import',
              callback_data: 'import_wallet'
            },
            {
                text: 'Main Menu',
                callback_data: 'menu'
            }
          ]
        ]
    };
    
    // Send a message with the inline markup
    await bot.sendMessage(chat_id, 'My Wallet Menu', {
        reply_markup: markup
    });

    return true
}

const importWallet = async (bot, chat_id, data, provider) => { 
    try {
        const private_key = data.text.slice(12)
        const wallet = new ethers.Wallet(private_key)
        if (wallet) {
            provider.getBalance(wallet.address).then((_balance) => {
                const balance = ethers.utils.formatEther(_balance);
                bot.sendMessage(chat_id, `<b>Your wallet address:</b> ${wallet.address}\n<b>Balance:</b> ${balance || 0} ETH`,{parse_mode: "HTML"});
            })
        } else {
            bot.sendMessage(chat_id, `Invalid Private Key`);
        }
    
        return true
    } catch (error) {
        console.log(error);
        bot.sendMessage(chat_id, error.message);
    }
}

const checkBalance = async (bot, msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    try {
    const wallet = text.slice(9)
    const isAddress = await bnbWeb3.utils.isAddress(wallet)
    if(isAddress) {
        const botMsg = await bot.sendMessage(chatId, 'Checking...')
        const botMsgId = botMsg.message_id
        const eth = await ethWeb3.eth.getBalance(wallet)
        await bot.deleteMessage(chatId, botMsgId)
        await bot.sendMessage(chatId,
        `${bnbWeb3.utils.fromWei(eth, 'ether')} ETH`
        ) 
    } else {
        await bot.sendMessage(chatId, 'This is not an address')
    }
    } catch (error) {
        await bot.sendMessage(chatId, 'Something went wrong')
    }
}

const mainMenu = (bot, msg) => {
    const chat_id = msg.chat.id
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
      bot.sendMessage(chat_id, 'You are in Main Menu', {
        reply_markup: markup
      });
}

module.exports = {
    myWallet,
    importWallet,
    checkBalance,
    mainMenu
}