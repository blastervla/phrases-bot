var http = require('https');
var fs = require('fs');
const AUDIO_DATABASE_FILE_NAME = './audioDatabase.vladb';
const TEXT_DATABASE_FILE_NAME = './textDatabase.vladb';
const VIDEO_DATABASE_FILE_NAME = './videoDatabase.vladb';
const IMAGE_DATABASE_FILE_NAME = './imageDatabase.vladb';
var isUpdating = false;
function updateAudioDatabase() {
	isUpdating = true;
	fs.truncate(AUDIO_DATABASE_FILE_NAME, 0, function() {
		var file = fs.createWriteStream(AUDIO_DATABASE_FILE_NAME);
		var request = http.get("https://dl.dropboxusercontent.com/s/wlrgbjnykoc8k7p/audioDatabase.vladb", function(response) {
			response.pipe(file);
			file.on('finish', function() {
				isUpdating = false;
			});
		});
	});
}
function updateTextDatabase() {
	isUpdating = true;
	fs.truncate(TEXT_DATABASE_FILE_NAME, 0, function() {
		var file = fs.createWriteStream(TEXT_DATABASE_FILE_NAME);
		var request = http.get("https://dl.dropboxusercontent.com/s/k7q895kmzdere8k/textDatabase.vladb", function(response) {
			response.pipe(file);
			file.on('finish', function() {
				isUpdating = false;
			});
		});
	});
}
function updateImageDatabase() {
	isUpdating = true;
	fs.truncate(IMAGE_DATABASE_FILE_NAME, 0, function() {
		var file = fs.createWriteStream(IMAGE_DATABASE_FILE_NAME);
		var request = http.get("https://dl.dropboxusercontent.com/s/3qc1nip0phbqph7/imageDatabase.vladb", function(response) {
			response.pipe(file);
			file.on('finish', function() {
				isUpdating = false;
			});
		});
	});
}

function updateVideoDatabase() {
	isUpdating = true;
	fs.truncate(VIDEO_DATABASE_FILE_NAME, 0, function() {
		var file = fs.createWriteStream(VIDEO_DATABASE_FILE_NAME);
		var request = http.get("https://dl.dropboxusercontent.com/s/bus1ja15imj5vco/videoDatabase.vladb", function(response) {
			response.pipe(file);
			file.on('finish', function() {
				isUpdating = false;
			});
		});
	});
}

module.exports = {
	isUpdating: isUpdating,
	updateAudioDatabase: updateAudioDatabase,
	updateTextDatabase: updateTextDatabase,
	updateImageDatabase: updateImageDatabase,
	updateVideoDatabase: updateVideoDatabase
};