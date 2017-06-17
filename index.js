const TeleBot = require('telebot');
var express = require('express');
var app = express();
var Credentials = require('./Credentials.js');
const bot = new TeleBot({
    token: Credentials.getAuthToken(), // Required. Telegram Bot API token.
    polling: { // Optional. Use polling.
        interval: 1000, // Optional. How often check updates (in ms).
        limit: 100, // Optional. Limits the number of updates to be retrieved.
        retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
    }
});
bot.on('inlineQuery', msg => {
    let query = msg.query;

    // Create a new answer list object
    const answers = bot.answerList(msg.id, {cacheTime: 60});

    // Article
    answers.addArticle({
        id: 'query',
        title: 'Inline Title',
        description: `Your query: ${ query }`,
        message_text: 'Click!'
    });

    // Photo
    answers.addPhoto({
        id: 'photo',
        caption: 'Telegram logo.',
        photo_url: 'https://telegram.org/img/t_logo.png',
        thumb_url: 'https://telegram.org/img/t_logo.png'
    });

    // Gif
    answers.addGif({
        id: 'gif',
        gif_url: 'https://telegram.org/img/tl_card_wecandoit.gif',
        thumb_url: 'https://telegram.org/img/tl_card_wecandoit.gif'
    });

    // Send answers
    return bot.answerQuery(answers);
});
bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome!'));
bot.start();
// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!');
});