require('telebot');
const DropboxManager = require('./DropboxManager.js');
const EmojiManager = require('node-emoji');
var ramDB;
var oldDBLines = null;
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
	if(query != "") {
		if (query.toLowerCase().indexOf('emojify') != -1) {
			var emojifiedText = EmojiManager.emojify(query.slice(8));
			answers.addArticle({
				id: 'emojify',
				title: "Emojify!!",
				description: '',
				message_text: emojifiedText
			});
		} else if (query.toLowerCase().indexOf('emoji') != -1 && query.toLowerCase().indexOf('search') != -1) {
			var emojiSearch = EmojiManager.search(query.substring(query.toLowerCase().indexOf('search') + 7));
			if (_isValidInfo([emojiSearch])) {
				for (var i = emojiSearch.length - 1; i >= 0; i--) {
					if (_isValidInfo([emojiSearch[i]])) {
						console.log(EmojiManager.unemojify(emojiSearch[i]['key']) + "→ " + emojiSearch[i]['emoji']);
						answers.addArticle({
							id: 'emoji' + i,
							title: EmojiManager.unemojify(emojiSearch[i]['key']) + "→ " + emojiSearch[i]['emoji'],
							description: '',
							message_text: ''
						});
					}
				}
			}
		} else if (query.toLowerCase().indexOf('emo') != -1){
			var emojiSearch = EmojiManager.get(query.slice(4));
			console.log(emojiSearch);
			console.log(query.slice(4));
			if (_isValidInfo([emojiSearch])) {
				answers.addArticle({
					id: 'emoji' + i,
					title: emojiSearch,
					description: '',
					message_text: emojiSearch
				});
			}
		}
		fs.readFileSync('./textDatabase.vladb').toString().split('\n').forEach(function (line) {
			if (query.toLowerCase() == "text" || line.toLowerCase().indexOf(query.toLowerCase()) != -1) {
				if (_isValidInfo([_getFileID(line), _getFileTitle(line), _getFileURL(line)])) {
					answers.addArticle({
						id: _getFileID(line),
						title: _getFileTitle(line),
						description: '',
						message_text: _getFileURL(line)
					});
				}
			}
		});
	}
	fs.readFileSync('./audioDatabase.vladb').toString().split('\n').forEach(function (line) {
		if (query.toLowerCase() == 'all' || line.toLowerCase().indexOf(query.toLowerCase()) != -1) {
			if (_isValidInfo([_getFileID(line), _getFileTitle(line), _getFileURL(line)])) {
				answers.addVoice({
					id: _getFileID(line),
					title: _getFileTitle(line),
					voice_url: _getFileURL(line)
				});
			}
		}
	});
	if (query != "") {
		fs.readFileSync('./videoDatabase.vladb').toString().split('\n').forEach(function (line) {
			if (query.toLowerCase() == 'all' || line.toLowerCase().indexOf(query.toLowerCase()) != -1) {
				if (_isValidInfo([_getFileID(line), _getFileTitle(line), _getFileURL(line), _getFileThumbnail(line)])) {
					answers.addVideo({
						id: _getFileID(line),
						title: _getFileTitle(line),
						video_url: _getFileURL(line),
						thumb_url: _getFileThumbnail(line),
						mime_type: 'video/mp4'
					});
				}
			}
		});
	}
	if(query.toLowerCase().indexOf('google') != -1) {
		var googleURL = 'http://www.letmegooglethat.com/?q=' + query.slice(7).split(' ').join('+');
		if(_isValidInfo([googleURL])) {
			answers.addArticle({
				id: 'lmgtfy',
				title: 'Let me google that for you...',
				description: '',
				message_text: googleURL
			});
		}
	}
	if(answers.length == 0) {
		answers.addArticle({
			id: 'noRes',
			title: "Sorry, this bot can't do anything about it" + EmojiManager.get('cry'),
			description: '',
			message_text: ''
		});
	}
	return _getAnswersToReturn(bot, answers, query);
}

function _getFileTitle(line) {
	return line.substring(line.indexOf('~') + 1, line.indexOf(';'));
}

function _getFileURL(line) {
	if(line.indexOf('|') != -1)
		return line.substring(line.indexOf(':') + 1, line.indexOf('|'));
	else
		return line.substring(line.indexOf(':') + 1);
}

function _getFileID(line) {
	return line.substring(0, line.indexOf('~'));
}

function _getFileThumbnail(line) {
	return line.substring(line.indexOf('|') + 1);
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

function getUpdatedLinks() {
	var fs  = require("fs");
	var oldUrls = [];
	var fileNames = [];
	oldDBLines = [];
	var i = 0;
	fs.readFileSync('./audioDatabase.vladb').toString().split('\n').forEach(function (line) {
		oldUrls[i] = _getFileURL(line);
		fileNames[i] = (oldUrls[i].split('/')[oldUrls[i].split('/').length - 1]).replace('?dl=0', '');
		oldDBLines[i] = line;
	});
	DropboxManager.updateLinks(oldUrls, fileNames, DropboxManager.FileType.AUDIO);
}

function saveUpdatedLinks() {
	var fs  = require("fs");
	var linkDictionary = DropboxManager.getUpdatedLinks();
	if (linkDictionary != null && linkDictionary != undefined) {
		var toWrite = "";
		for (var i = oldDBLines.length - 1; i >= 0; i--) {
			var oldUrl = _getFileURL(oldDBLines[i]);
			toWrite += oldDBLines[i].replace(oldUrl, linkDictionary[oldUrl]) + "\n";
		}
		fs.writeFileSync('./audioDatabase.vladb', toWrite.substring(0, toWrite.length - 1));
		ramDB = toWrite;
		return false;
	}
	return true;
}

function getRamDB() {
	return ramDB;
}

function getDropboxUpdatedLinks() {
	return DropboxManager.getUpdatedLinks();
}

function _isValidInfo(info){
	var toReturn = true;
	for (var i = info.length - 1; i >= 0; i--) {
		toReturn = toReturn && (info[i] != null && info[i] != undefined && info[i] != "");
	}
	return toReturn;
}

module.exports = {
	getQueryAnswers: getQueryAnswers,
	getUpdatedLinks: getUpdatedLinks,
	saveUpdatedLinks: saveUpdatedLinks,
	getRamDB: getRamDB,
	getDropboxUpdatedLinks: getDropboxUpdatedLinks
};