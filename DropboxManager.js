var Dropbox = require('dropbox');
var Credentials = require('./Credentials.js');
function getFileLink(file) {
	var dbx = new Dropbox({ accessToken: Credentials.getDropboxAuthToken() });
	dbx.sharingCreateSharedLinkWithSettings({path: '/Phrases-Bot/TelegramAudios/prueba2.ogg'}).then(function(response) {
      	console.log(response);
      	console.log(response.url);
      	console.log(response[0].url);
    });
    /*dbx.sharingGetSharedLinks({path: '/Phrases-Bot/TelegramAudios/Nunca_compres_tiempos_compartidos.ogg'}).then(function(response) {
      	return response.links[0].url;
    });*/
}
module.exports = {
	getFileLink: getFileLink
};