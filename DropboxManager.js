var Dropbox = require('dropbox');
var Credentials = require('./Credentials.js');
function getFileLink(file) {
	var dbx = new Dropbox({ accessToken: Credentials.getDropboxAuthToken() });
	dbx.sharingCreateSharedLinkWithSettings({path: '/Phrases-Bot/TelegramAudios/Nunca_compres_tiempos_compartidos.ogg'}).then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
}
module.exports = {
	getFileLink: getFileLink
};