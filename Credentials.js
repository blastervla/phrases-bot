var authToken = "422907398:AAG1dQbHkh2tmK39TJD_TAQeY5XDEn9au6s";
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