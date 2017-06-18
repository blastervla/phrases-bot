require('telebot');
function getQueryAnswers(bot, answers, msg) {
	let query = msg.query;
	if (query == "") 
		return;
	// if (query == "tiempos") {
	// 	answers.addVoice({
	// 		id: 'tiempos',
	// 		title: 'Nunca compres tiempos compartidos',
	// 		voice_url: 'https://dl.dropboxusercontent.com/s/mnfx6c4p6s8gs38/Nunca_compres_tiempos_compartidos.ogg'
	// 	});
	// 	return answers;
	// }
    // Create a new answer list object
    var foundSomething = false;
    var fs  = require("fs");
    //For each line in file:
	fs.readFileSync('./audioDatabase.vladb').toString().split('\n').forEach(function (line) {
		if (line.toLowerCase().indexOf(query.toLowerCase()) != -1) {
			answers.addVoice({
				id: _getAudioID(line),
				title: _getAudioTitle(line),
				voice_url: _getAudioURL(line)
			});
			foundSomething = true;
		}
	});
	return _getAnswersToReturn(bot, answers, foundSomething, query);
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

function _getAnswersToReturn(bot, answers, hasFoundSomething, query){
	if (false) {
		answers.addArticle({
	        id: 'no_results',
	        title: 'No results for:',
	        description: '"' + query + '"',
	        message_text: 'No results'
	    });
	}
	return bot.answerQuery(answers);
}

module.exports = {
	getQueryAnswers: getQueryAnswers
};