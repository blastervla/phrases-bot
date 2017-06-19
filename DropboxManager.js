var Dropbox = require('dropbox');
var Credentials = require('./Credentials.js');
function getFileLink(file) {
	var dbx = new Dropbox({ accessToken: Credentials.getDropboxAuthToken() });
	/*dbx.sharingCreateSharedLinkWithSettings({path: '/Phrases-Bot/TelegramAudios/Nunca_compres_tiempos_compartidos.ogg'}).then(function(response) {
      	console.log(response);
    });*/
    dbx.sharingGetSharedLinks({path: '/Phrases-Bot/TelegramAudios/Nunca_compres_tiempos_compartidos.ogg'}).then(function(response) {
      	console.log(response);
      	console.log('Index: ' + response.indexOf('https://www.dropbox.com/s/'));
      	console.log('Index2: ' + response.indexOf('?dl=0'));
      	console.log(response.substring(response.indexOf('https://www.dropbox.com/s/'), response.indexOf('?dl=0')));
    });
}
module.exports = {
	getFileLink: getFileLink
};