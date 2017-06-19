var authToken = "422907398:AAG1dQbHkh2tmK39TJD_TAQeY5XDEn9au6s";
var dropBoxAuthToken = "pBNY_4nhfkwAAAAAAAAAQB4cnhmOqGeeNLC_Ra4vBaBr80ja9ReOwnRPR3JMQ2xG";
function getAuthToken() {
	return authToken;
}
function getDropboxAuthToken() {
	return dropBoxAuthToken;
}
module.exports = {
	getAuthToken: getAuthToken,
	getDropboxAuthToken: getDropboxAuthToken
};