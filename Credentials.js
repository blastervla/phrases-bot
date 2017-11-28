var authToken = "505043091:AAGqJ-sJffzjJwIfpVSYySPyaWLsMgjuEF0";
var dropBoxAuthToken = "pBNY_4nhfkwAAAAAAAAAQpvSsGfIDc8UUi1lVKJfqyoNyO8zbYnQ3cRvglgDAtj1";
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