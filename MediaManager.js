require('telebot');
function getQueryAnswers(answers, msg) {
	let query = msg.query;
	if (query == "") 
		return;
    // Create a new answer list object
    var foundSomething = false;
    var fs  = require("fs");
    //For each line in file:
	fs.readFileSync('./audioDatabase.vladb').toString().split('\n').forEach(function (line) {
		console.log('Line: ' + line);
		console.log('Index of query (' + query + '): ' + line.indexOf(query));
		console.log('Index of --- END OF FILE --- : ' + line.indexOf('--- END OF FILE ---'));
		if (line.indexOf(query) != -1) {
			answers.addVoice({
				id: _getAudioID(line),
				title: _getAudioTitle(line),
				voice_url: _getAudioURL(line)
			});
			foundSomething = true;
		} else if (line.indexOf('--- END OF FILE ---') != -1) { //Reached EOF
			console.log('Reached EOF!');
			console.log(_getAnswersToReturn(answers, foundSomething, query));
			return _getAnswersToReturn(answers, foundSomething, query);
		}
	});
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

function _getAnswersToReturn(answers, hasFoundSomething, query){
	//if (!hasFoundSomething) {
		answers.addArticle({
	        id: 'no_results',
	        title: 'No results for:',
	        description: '"' + query + '"',
	        message_text: 'No results'
	    });
	//}
	return answers;
}

module.exports = {
	getQueryAnswers: getQueryAnswers
};