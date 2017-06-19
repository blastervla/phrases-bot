var Dropbox = require('dropbox');
var Credentials = require('./Credentials.js');
function getFileLink(file) {
	var prefs : Dropbox.SharingCreateSharedLinkWithSettingsArg;
	prefs.path: '/Phrases-Bot/TelegramAudios/Nunca_compres_tiempos_compartidos.ogg';
	var dbx = new Dropbox({ accessToken: Credentials.getDropboxAuthToken() });
	console.log(dbx.sharingCreateSharedLinkWithSettings(prefs).url);
}
module.exports = {
	getFileLink: getFileLink
};