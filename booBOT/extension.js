const vscode = require('vscode');
const { getRandomFact, getRandomLink } = require('./fetch-utils.js');

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	
	function getHalloweenCountdown() {
		const dayOfHalloween = new Date('October 31, 2022 12:00:00').getTime();
		const today = new Date().getTime();
		const secondsTillHalloween = dayOfHalloween - today;
		const daysTillHalloween = Math.floor(
			secondsTillHalloween / 1000 / 60 / 60 / 24
		);
		return daysTillHalloween;
	}
	const daysTillHalloween = getHalloweenCountdown();
	
	async function startTimerFunction() {
		setInterval(async () => {
			const facts = await getRandomFact();
			const links = await getRandomLink();
			const response = await vscode.window.showInformationMessage(
				`BOO! Did I scare you? Here's a spooky treat: ${facts.content} Would you like an extra treat? `,
				'Take me to the treat!',
				'No, life is spooky enough.'
				);
				if (response === 'Take me to the treat!') {
					vscode.env.openExternal(vscode.Uri.parse(`${links.url}`));
			} else if (response === 'No, life is spooky enough.') {
				vscode.window.showInformationMessage("Ok, see you next haunting...");
			}
		}, 10000);
	}

	let disposable = vscode.commands.registerCommand(
		'booBOT.helloWorld',

		async function responseFunction() {
			console.log('daysTillHalloween', daysTillHalloween);
			const response = await vscode.window.showInformationMessage(
				`Welcome to boo!BOT. There are ${daysTillHalloween} days until Halloween. Would you like haunted enCounters today? `,
				'Spook me!',
				'No, life is spooky enough.'
			);
			if (response === 'Spook me!') {
				vscode.window.showInformationMessage("Ok, we'll haunt you shortly!");
				startTimerFunction();

			} else if (response === 'No, life is spooky enough.') {
				vscode.window.showInformationMessage(
					"Ok, hope you don't have any boos in your code today!"
				);
			}
		}
	);

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
