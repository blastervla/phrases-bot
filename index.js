const TeleBot = require('telebot');
var Credentials = require('../Credentials.js');
const bot = new TeleBot({
    token: Credentials.getAuthToken(),
    webhook: {
        // Self-signed certificate:
        // key: './key.pem',
        // cert: './cert.pem',
        url: 'https://....',
        host: '0.0.0.0',
        port: 443
    }
});

bot.on('text', msg => bot.sendMessage(msg.from.id, msg.text));

bot.start();