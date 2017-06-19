var Dropbox = require('dropbox');
var Credentials = require('./Credentials.js');
function getFileLink(file) {
	var prefs = {path: 'TelegramAudios/Nunca_compres_tiempos_compartidos.ogg'};
	console.log(Dropbox.sharingCreateSharedLinkWithSettings(prefs).url);
}
module.exports = {
	getFileLink: getFileLink
};