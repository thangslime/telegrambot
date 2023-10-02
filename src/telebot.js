const { ethers } = require("ethers");

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

const importWallet = async (bot, chat_id, data) => {
    const wallet = new ethers.Wallet(data.message.text)

    if (wallet) {
        await bot.sendMessage(chat_id, `Your wallet address: ${wallet.address}`);
    } else {
        await bot.sendMessage(chat_id, `Invalid Private Key`);
    }

    return true
}

module.exports = {
    myWallet,
    importWallet
}