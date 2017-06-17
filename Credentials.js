var authToken = "422907398:AAG1dQbHkh2tmK39TJD_TAQeY5XDEn9au6s";
Credentials.prototype.getAuthToken = function() {
	return authToken;
}
module.exports = {
	getAuthToken: getAuthToken()
};