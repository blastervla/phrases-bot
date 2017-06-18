require('telebot');
function getQueryAnswers(answers, msg) {
	let query = msg.query;
    // Create a new answer list object
    var foundSomething = false;
	var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('./audioDatabase.vladb')
	});
	lineReader.on('line', function (line) {
		console.log('Line: ' + line);
		console.log('Index of query (' + query + '): ' + line.indexOf(query));
		if (line.indexOf(query) != -1) {
			answers.addVoice({
				id: _getAudioID(line),
				title: _getAudioTitle(line),
				voice_url: _getAudioURL(line)
			});
			foundSomething = true;
		}
	});
	lineReader.on('end' function() {
		return answers;
	});
	/*if (!foundSomething) {
		answers.addArticle({
	        id: 'nothing_found',
	        title: 'No results for:',
	        description: '"' + query + '"',
	        message_text: 'No results :('
	    });
	}*/
	//return answers;
}

function _getAudioTitle(line) {
	console.log('Audio title: ' + line.substring(line.indexOf('~') + 1, line.indexOf(';')));
	return line.substring(line.indexOf('~') + 1, line.indexOf(';'));
}

function _getAudioURL(line) {
	console.log('Audio url: ' + line.substring(line.indexOf(':') + 1));
	return line.substring(line.indexOf(':') + 1);
}

function _getAudioID(line) {
	console.log('Audio id: ' + line.substring(0, line.indexOf('~')));
	return line.substring(0, line.indexOf('~'));
}

module.exports = {
	getQueryAnswers: getQueryAnswers
};