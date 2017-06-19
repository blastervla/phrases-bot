require('telebot');
const DropboxManager = require('./DropboxManager.js');
var updatingLinks;
function getQueryAnswers(bot, answers, msg) {
	if(updatingLinks) {
		console.log('Updating links... yet...');
		return;
	}
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
			answers.addVoice({
				id: _getAudioID(line),
				title: _getAudioTitle(line),
				voice_url: _getAudioURL(line)
			});
		}
	});
	return _getAnswersToReturn(bot, answers, query);
}

function _getAudioTitle(line) {
	return line.substring(line.indexOf('~') + 1, line.indexOf(';'));
}

function _getAudioURL(line) {
	return line.substring(line.indexOf(':') + 1);
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
	var restOfQuery = query.substring(query.indexOf(' ') + 1);
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
}

function _retardizeText(text) {
	var retardizedText = "";
	for (var i = 0; i < text.length; i++) {
		var chance = Math.round(Math.random());
		retardizedText += chance ? text[i].toUpperCase() : text[i].toLowerCase();
	}
	return retardizedText;
}

function updateLinks() {
	updatingLinks = true;
	var fs  = require("fs");
	var toWrite = "";
	fs.readFileSync('./audioDatabase.vladb').toString().split('\n').forEach(function (line) {
		var oldURL = _getAudioURL(line);
		var fileName = (oldURL.split('/')[oldURL.split('/').length - 1]).replace('?dl=0', '');
		console.log('FileName = ' + fileName);
		var newURL = DropboxManager.getFileLink(DropboxManager.FileType.AUDIO, fileName);
		/*while(newURL === undefined) {
			require('deasync').runLoopOnce();
			console.log('newURL = ' + newURL);
		}*/
		toWrite += line.replace(oldURL, newURL) + '\n';
	});
	console.log('ToWrite -2 = ' + toWrite.substring(toWrite.length - 1));
	fs.writeFile('./audioDatabase.vladb', toWrite.substring(0, toWrite.length - 1), function(err) {
		console.log(err);
	});
	updatingLinks = false;
	console.log('Stopped updating links');
}

module.exports = {
	getQueryAnswers: getQueryAnswers,
	updateLinks: updateLinks
};