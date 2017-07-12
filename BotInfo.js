const welcomeMessage = "Hey!\n\n" +
					   "This bot will provide you with movie phrases to use in your conversations.\n\n" +
					   "Please refer to the /help command in order to learn how to use it.\n\n" +
					   "Enjoy!";

const helpMessage = "To use this bot, just type @PhrasesBot followed by a space and your desired query.\n\n" +
					"Then, simply choose from one of the given results and BOOM! Your message has been sent.\n\n" +
					"More features coming soon!";

function getWelcomeMessage() {
	return welcomeMessage;
}

function getHelpMessage() {
	return helpMessage;
}

module.exports = {
	getWelcomeMessage: getWelcomeMessage,
	getHelpMessage, getHelpMessage
};