var Dropbox = require('dropbox');
var Credentials = require('./Credentials.js');
const path = '/Phrases-Bot/';
var linkDictionary = null;
const FileType = {
    AUDIO : 'audio',
    MEME : 'meme'
};
function getFileLink(fileType, fileName) {
	var dbx = new Dropbox({ accessToken: Credentials.getDropboxAuthToken() });
	var filePath = path + (fileType == FileType.AUDIO ? 'TelegramAudios/' : 'TelegramMemes/') + fileName;
	console.log(filePath);
	dbx.sharingGetSharedLinks({path: filePath}).then(function(response) {
		console.log((response.links[0].url).replace('www.dropbox.com', 'dl.dropboxusercontent.com'));
		return (response.links[0].url).replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
	}).catch(function(error) {
		console.error(error);
		console.error('Well, fuck. Shit happens');
		dbx.sharingCreateSharedLinkWithSettings({path: filePath}).then(function(response) {
	      	if(response.url != undefined) {
	      		console.log((response.url).replace('www.dropbox.com', 'dl.dropboxusercontent.com'));
	      		return (response.url).replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
	      	}
	    });
	});
}

function updateLinks(oldUrls, fileNames) {
	linkDictionary = null;
	var dbx = new Dropbox({ accessToken: Credentials.getDropboxAuthToken() });
	for (var i = 0; i < oldUrls.length; i++) {
		var filePath = path + (fileType == FileType.AUDIO ? 'TelegramAudios/' : 'TelegramMemes/') + fileNames[i];
		console.log(filePath);
		dbx.sharingGetSharedLinks({path: filePath}).then(function(response) {
			console.log((response.links[0].url).replace('www.dropbox.com', 'dl.dropboxusercontent.com'));
			linkDictionary[oldUrls[i]] = (response.links[0].url).replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
		}).catch(function(error) {
			console.error(error);
			console.error('Well, fuck. Shit happens');
			dbx.sharingCreateSharedLinkWithSettings({path: filePath}).then(function(response) {
		      	if(response.url != undefined) {
		      		console.log((response.url).replace('www.dropbox.com', 'dl.dropboxusercontent.com'));
		      		linkDictionary[oldUrls[i]] = (response.url).replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
		      	}
		    });
		});
	}
}

function getUpdatedLinks() {
	return linkDictionary;
}
module.exports = {
	getFileLink: getFileLink,
	FileType: FileType,
	updateLinks: updateLinks,
	getUpdatedLinks: getUpdatedLinks
};