require('telebot');
function getQueryAnswers(answers, msg) {
	let query = msg.query;
    // Create a new answer list object
	var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('./audioDatabase.vladb')
	});
	var foundSomething = false;
	lineReader.on('line', function (line) {
		if (line.indexOf(query) != -1) {
			answers.addVoice({
				id: _getAudioID(line),
				title: _getAudioTitle(line),
				voice_url: _getAudioURL(line)
			});
			foundSomething = true;
		}
	});
	if (!foundSomething) {
		answers.addArticle({
	        id: 'nothing_found',
	        title: 'No results for:',
	        description: '"' + query + '"'
	    });
	}
	return answers;
}

function _getAudioTitle(line) {
	return line.substring(line.indexOf('~'), line.indexOf(';'));
}

function _getAudioURL(line) {
	return line.substring(line.indexOf(':'));
}

function _getAudioID(line) {
	return line.substring(line.indexOf('~'));
}

module.exports = {
	getQueryAnswers: getQueryAnswers
};