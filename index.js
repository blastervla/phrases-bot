const TeleBot = require('telebot');
var express = require('express');
var app = express();
var http = require("http");
var Credentials = require('./Credentials.js');
var MediaManager = require('./MediaManager.js');
var BotInfo = require('./BotInfo.js');
var DatabaseManager = require('./DatabaseManager.js');
const bot = new TeleBot({
    token: Credentials.getAuthToken(), // Required. Telegram Bot API token.
    polling: { // Optional. Use polling.
        interval: 1000, // Optional. How often check updates (in ms).
        limit: 100, // Optional. Limits the number of updates to be retrieved.
        retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
    }
});
bot.on('inlineQuery', msg => {
	const answers = bot.answerList(msg.id, {cacheTime: 60});
	var answersToReturn = MediaManager.getQueryAnswers(bot, answers, msg);
    return answersToReturn;
});

bot.on('/help', function(msg) {
	return msg.reply.text(BotInfo.getHelpMessage());
});

bot.on('/start', function(msg) {
	return msg.reply.text(BotInfo.getWelcomeMessage());
});

bot.on('/features', function(msg) {
    return msg.reply.text(BotInfo.getFeaturesMessage());
});

bot.on(/^\/update_audio (.+)$/, (msg, props) => {
    const pass = props.match[1];
    return MediaManager.authAdm(msg, pass, MediaManager.UpdateType.AUDIO);
});

bot.on(/^\/update_text (.+)$/, (msg, props) => {
    const pass = props.match[1];
    return MediaManager.authAdm(msg, pass, MediaManager.UpdateType.TEXT);
});

bot.on(/^\/update_image (.+)$/, (msg, props) => {
    const pass = props.match[1];
    return MediaManager.authAdm(msg, pass, MediaManager.UpdateType.IMAGE);
});

bot.on(/^\/update_video (.+)$/, (msg, props) => {
    const pass = props.match[1];
    return MediaManager.authAdm(msg, pass, MediaManager.UpdateType.VIDEO);
});

bot.start();

// Finally, start our server
app.listen((process.env.PORT || 5000), function() {
  console.log('Telegram app listening on port ' + (process.env.PORT || 5000) + '!');
});
setInterval(function() {
    http.get("http://phrases-bot.herokuapp.com");
}, 300000); // every 5 minutes (300000), keeps bot awake