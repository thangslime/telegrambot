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
    try {
        const private_key = data.text.slice(12)
        const provider = ethers.getDefaultProvider()
        const wallet = new ethers.Wallet(private_key, provider)
        if (wallet) {
            const balance = await wallet.getBalance()
            await bot.sendMessage(chat_id, `Your wallet address: ${wallet.address}`);
            await bot.sendMessage(chat_id, `Your balance: ${ethers.utils.formatEther(balance)} ETH`);
        } else {
            await bot.sendMessage(chat_id, `Invalid Private Key`);
        }
    
        return true
    } catch (error) {
        await bot.sendMessage(chat_id, `Invalid Private Key`);
    }
}

module.exports = {
    myWallet,
    importWallet
}