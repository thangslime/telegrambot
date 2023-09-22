const handleEvent = async (bot) => {
    bot.onText(/\/summon/, (msg, match) => {
        const opts = {
            reply_to_message_id: msg.message_id,
            reply_markup: JSON.stringify({
                keyboard: [
                    ['support'],
                    ['nothing']
                ]
            })
        };
        bot.sendMessage(msg.chat.id, 'Ây dô đứa nào gọi tao?', opts);
    });

    bot.on('callback_query', function onCallbackQuery(callbackQuery) {
        const data = JSON.parse(callbackQuery.data);
        const opts = {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id,
        };
        switch (data.command) {
            case 'support':
                
                break;
            case value:
                
                break;
            default:
                break;
        }
        if (data.command === 'support') {
            bot.sendMessage(opts.chat_id, `Hỏi google đê`);
        }
        if (data.command === 'nothing') {
            bot.sendMessage(opts.chat_id, `Cút cút`);
        }
    });
}

module.exports = {
    handleEvent
}