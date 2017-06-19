var Dropbox = require('dropbox');
var Credentials = require('./Credentials.js');
function getFileLink(file) {
	var dbx = new Dropbox({ accessToken: Credentials.getDropboxAuthToken() });
	console.log(dbx.sharingCreateSharedLinkWithSettings({path: '/Phrases-Bot/TelegramAudios/Nunca_compres_tiempos_compartidos.ogg'}));
}
module.exports = {
	getFileLink: getFileLink
};