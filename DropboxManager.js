var Dropbox = require('dropbox');
var Credentials = require('./Credentials.js');
const path = '/Phrases-Bot/';

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
		return (response.links[0].url).replace('www.dropbox.com', 'dl.dropboxusercontent.com');
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
module.exports = {
	getFileLink: getFileLink,
	FileType: FileType
};