const TeleBot = require('telebot');
var Credentials = require('./Credentials.js');
const bot = new TeleBot({
    token: Credentials.getAuthToken(),
    webhook: {
        url: 'https://api.telegram.org/bot' + Credentials.getAuthToken() + '/setWebhook',
        host: 'https://phrases-bot.herokuapp.com/new-message',
        port: (process.env.PORT || 5000)
    }
});

bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome!'));
bot.start();