const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider('https://ethereum.publicnode.com');

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
        const wallet = new ethers.Wallet(private_key)
        if (wallet) {
            const _balance = await provider.getBalance('0xB1389500b55ea7388A214c169E9800A2c58a6361')
            const balance = ethers.utils.formatEther(_balance);
            bot.sendMessage(chat_id, `<b>Your wallet address:</b> ${wallet.address}\n<b>Balance:</b> ${balance || 0} ETH`,{parse_mode: "HTML"});
        } else {
            await bot.sendMessage(chat_id, `Invalid Private Key`);
        }
    
        return true
    } catch (error) {
        console.log(error);
        await bot.sendMessage(chat_id, error.message.toString());
    }
}

module.exports = {
    myWallet,
    importWallet
}