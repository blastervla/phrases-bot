var Dropbox = require('dropbox');
var Credentials = require('./Credentials.js');
function getFileLink(file) {

	console.log(Dropbox.sharingCreateSharedLinkWithSettings(new Dropbox.SharingCreateSharedLinkWithSettingsArg('TelegramAudios/Nunca_compres_tiempos_compartidos.ogg')).url);
}
module.exports = {
	getFileLink: getFileLink
};