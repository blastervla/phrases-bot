const TeleBot = require('telebot');
var Credentials = require('./Credentials.js');
const bot = new TeleBot({
    token: 'bot' + Credentials.getAuthToken(),
    webhook: {
        url: 'https://api.telegram.org',
        host: 'localhost',
        port: (process.env.PORT || 5000)
    }
});

bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome!'));
bot.start();