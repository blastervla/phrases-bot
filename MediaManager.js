require('telebot');
const EmojiManager = require('node-emoji');
const DatabaseManager = require('./DatabaseManager.js');
var oldDBLines = null;
const UpdateType = {
	AUDIO : 0,
    TEXT : 1,
    IMAGE : 2,
    VIDEO : 3
}
function authAdm(msg, pass, updateType) {
	if (pass == "Vladimeiser") {
		var type = "";
    	switch (updateType) {
    		case UpdateType.AUDIO: {
    			DatabaseManager.updateAudioDatabase();
    			type = "Audios";
    			break;
    		}
    		case UpdateType.TEXT: {
    			DatabaseManager.updateTextDatabase();
    			type = "Texts";
    			break;
    		}
    		case UpdateType.IMAGE: {
    			DatabaseManager.updateImageDatabase();
    			type = "Images";
    			break;
    		}
    		case UpdateType.VIDEO: {
    			DatabaseManager.updateVideoDatabase();
    			type = "Videos";
    			break;
    		}
    	}
   		return msg.reply.text('As you command, Vladimir, The Vampire Prince. Updating ' + type + '!');
	} else {
		return msg.reply.text("Sorry dude, but you're not HIM");
	}
}
function getQueryAnswers(bot, answers, msg) {
	let query = msg.query;
	if (!DatabaseManager.isUpdating) {
		if (query.indexOf('meme') == -1) {
		    _getAudioQueryAnswersToReturn(bot, answers, query);
		} else {
			_getMemeQueryAnswersToReturn(bot, answers, query);
		}
	} else {
		return bot.answerQuery(answers);
	}
}

function _getAudioQueryAnswersToReturn(bot, answers, query) {
	var fs  = require("fs");
	//For each line in file:
	if(query != "") {
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
		if (line.toLowerCase().indexOf('sensitive') == -1 || (line.toLowerCase().indexOf('sensitive') != -1 && (query.toLowerCase().indexOf('sensitive') != -1))) {
			if (query.toLowerCase() == 'all' || line.toLowerCase().indexOf(query.toLowerCase()) != -1) {
				if (_isValidInfo([_getFileID(line), _getFileTitle(line), _getFileURL(line)])) {
					answers.addVoice({
						id: _getFileID(line),
						title: _getFileTitle(line),
						voice_url: _getFileURL(line)
					});
				}
			}
		}
	});
	if (query != "" && query.toLowerCase().indexOf("pm") != -1) {
		query = query.replace("pm", "").replace(" ", ""); //Clean query
		fs.readFileSync('./imageDatabase.vladb').toString().split('\n').forEach(function (line) {
			if (query.toLowerCase().indexOf('all') != -1 || line.toLowerCase().indexOf(query.toLowerCase()) != -1) {
				if (_isValidInfo([_getFileID(line), _getFileURL(line)])) {
					var thumb = _getFileThumbnail(line);
					if (!_isValidInfo([thumb])) {
						thumb = _getFileURL(line);
					}
					answers.addPhoto({
				        id: _getFileID(line),
				        caption: '',
				        photo_url: _getFileURL(line),
				        thumb_url: thumb
				    });
				}
			}
		});
	}
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

function _isValidInfo(info){
	var toReturn = true;
	for (var i = info.length - 1; i >= 0; i--) {
		toReturn = toReturn && (info[i] != null && info[i] != undefined && info[i] != "");
	}
	return toReturn;
}

module.exports = {
	getQueryAnswers: getQueryAnswers,
	UpdateType: UpdateType,
	authAdm: authAdm
};