const TeleBot = require('telebot');
var Credentials = require('./Credentials.js');
const bot = new TeleBot({
    token: Credentials.getAuthToken(),
    webhook: {
        url: 'https://api.telegram.org/bot' + Credentials.getAuthToken() + '/sendMessage',
        host: 'localhost',
        port: (process.env.PORT || 5000)
    }
});

bot.on('text', msg => bot.sendMessage(msg.from.id, msg.text));

bot.start();