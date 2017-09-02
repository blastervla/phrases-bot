/* Commands & descriptions:
start - Starts the bot
help - I need somebody. HELP!
features - List the bot's features
*/
const welcomeMessage = "Hey!\n\n" +
					   "This bot will provide you with movie phrases to use in your conversations.\n\n" +
					   "Please refer to the /help command in order to learn how to use it.\n\n" +
					   "Enjoy!";

const helpMessage = "To use this bot, just type @PhrasesBot followed by a space and your desired query.\n\n" +
					"Then, simply choose from one of the given results and BOOM!💥 Your message has been sent.\n\n" +
					"Please refer to the /features command to get a full list of all the bots features.\n\n" +
					"More features coming soon!";

const featuresMessage = "With this bot you can:\n\n" +
						"- Search for media ('@PhrasesBot <your query>')\n" +
						"- Type '@PhrasesBot google <your query>' to google for someone else 😉\n" +
						"- Type '@PhrasesBot meme1 <your input>' to retardize your input 😜\n" +
						"- Type '@PhrasesBot text' to get a preview of all the supported ASCII faces\n\n" +
						"More features coming soon!";

function getWelcomeMessage() {
	return welcomeMessage;
}

function getHelpMessage() {
	return helpMessage;
}

function getFeaturesMessage() {
	return featuresMessage;
}

module.exports = {
	getWelcomeMessage: getWelcomeMessage,
	getHelpMessage: getHelpMessage,
	getFeaturesMessage: getFeaturesMessage
};