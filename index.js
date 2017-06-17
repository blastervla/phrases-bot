const TeleBot = require('telebot');
var Credentials = require('./Credentials.js');
const bot = new TeleBot(Credentials.getAuthToken());
bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome!'));
bot.start();