require('telebot');
const DropboxManager = require('./DropboxManager.js');
function getQueryAnswers(bot, answers, msg) {
	let query = msg.query;
	if (query.indexOf('meme') == -1) {
	    _getAudioQueryAnswersToReturn(bot, answers, query);
	} else {
		_getMemeQueryAnswersToReturn(bot, answers, query);
	}
}

function _getAudioQueryAnswersToReturn(bot, answers, query) {
	var fs  = require("fs");
	//For each line in file:
	fs.readFileSync('./audioDatabase.vladb').toString().split('\n').forEach(function (line) {
		if (query.toLowerCase() == 'all' || line.toLowerCase().indexOf(query.toLowerCase()) != -1) {
			var uri = _getAudioURL(line);
			console.log(uri);
			answers.addVoice({
				id: _getAudioID(line),
				title: _getAudioTitle(line),
				voice_url: uri
			});
		}
	});
	console.log(answers);
	return _getAnswersToReturn(bot, answers, query);
}

function _getAudioTitle(line) {
	return line.substring(line.indexOf('~') + 1, line.indexOf(';'));
}

function _getAudioURL(line) {
	console.log('Got here');
	var toReturn = DropboxManager.getFileLink(DropboxManager.FileType.AUDIO, line.substring(line.indexOf(':') + 1));
	while(toReturn === undefined) {
		require('deasync').runLoopOnce();
	}
	return toReturn;
}

function _getAudioID(line) {
	return line.substring(0, line.indexOf('~'));
}

function _getAnswersToReturn(bot, answers, query){
	return bot.answerQuery(answers);
}

function _getMemeQueryAnswersToReturn(bot, answers, query) {
	var fs  = require("fs");
	var memeNumber = query.substring(query.indexOf('meme'), query.indexOf(' '));
	console.log('MemeNumber = ' + memeNumber);
	console.log('Index of meme = ' + query.indexOf('meme'));
	console.log('Index of space = ' + query.indexOf(' '));
	var restOfQuery = query.substring(query.indexOf(' ') + 1);
	console.log('Rest of query = ' + restOfQuery);
	//For each line in file:
	if (memeNumber.toLowerCase() == 'meme1') {
		answers.addPhoto({
			id: 'meme1',
	        caption: _retardizeText(restOfQuery),
	        photo_url: 'https://dl.dropboxusercontent.com/s/1rsj0yi11xqd3jw/Retarded_Spongebob.jpg',
	        thumb_url: 'https://dl.dropboxusercontent.com/s/1rsj0yi11xqd3jw/Retarded_Spongebob.jpg'
		});
		return _getAnswersToReturn(bot, answers, query);
	}
	/*fs.readFileSync('./memeDatabase.vladb').toString().split('\n').forEach(function (line) {
		if (memeNumber.toLowerCase() == 'all' || line.toLowerCase().indexOf(memeNumber) != -1) {
			answers.addPhoto({
				id: _getAudioID(line),
				title: _getAudioTitle(line),
				voice_url: _getAudioURL(line)
			});
		}
	});*/
	return _getAnswersToReturn(bot, answers, query);
}

function _retardizeText(text) {
	var retardizedText = "";
	for (var i = 0; i < text.length; i++) {
		var chance = Math.round(Math.random());
		retardizedText += chance ? text[i].toUpperCase() : text[i].toLowerCase();
	}
	return retardizedText;
}

module.exports = {
	getQueryAnswers: getQueryAnswers
};