var http = require('http');
var fs = require('fs');
const fileName = './audioDatabase.vladb';
var isUpdating = false;
function updateAudioDatabase() {
	isUpdating = true;
	fs.truncate(fileName, 0, function() {
		var file = fs.createWriteStream(fileName);
		var request = http.get("https://dl.dropboxusercontent.com/s/wlrgbjnykoc8k7p/audioDatabase.vladb", function(response) {
			response.pipe(file);
			file.on('finish', function() {
				isUpdating = false;
			});
		});
	});
}

module.exports = {
	isUpdating: isUpdating,
	updateAudioDatabase: updateAudioDatabase
};