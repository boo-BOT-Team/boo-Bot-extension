const vscode = require('vscode');
const { getRandomFact, getRandomLink } = require('./fetch-utils.js');

/**
 * @param {vscode.ExtensionContext} context
 */
let booStatusItem = vscode.window.createStatusBarItem(
	vscode.StatusBarAlignment.Right
);

async function activate(context) {
	getHalloweenCountdown();
	createStatusBarItem();
	showStatusBarItem();


	function testWindowEventListener() {
		vscode.window.onDidChangeWindowState((e) => {
			console.log(e);
     updateStatusBarItem();
		});
	}
	testWindowEventListener();

	const daysTillHalloween = getHalloweenCountdown();

	const oneMinute = 1000 * 60;
	const timeInterval = Number(
		vscode.workspace.getConfiguration('booBOT').get('timeInterval')
	);

	const booInterval = oneMinute * timeInterval;

	async function startTimerFunction() {
		setInterval(async () => {
			const facts = await getRandomFact();
			const links = await getRandomLink();
			const response = await vscode.window.showInformationMessage(
				`BOO! ༼ つ ╹ ╹ ༽つ Did I scare you? Here's a spooky treat: ${facts.content} Would you like an extra treat? `,
				'Take me to the treat!',
				'No, life is spooky enough.'
			);
			if (response === 'Take me to the treat!') {
				vscode.env.openExternal(vscode.Uri.parse(`${links.url}`));
			} else if (response === 'No, life is spooky enough.') {
				vscode.window.showInformationMessage('Ok, see you next haunting...');
			}
		}, booInterval);
	}

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

	let disposable = vscode.commands.registerCommand(
		'booBOT.helloWorld',
		function () {
			activate(context);
		}
	);

	context.subscriptions.push(disposable);
}

function getHalloweenCountdown() {

		let currentYear = new Date().getFullYear();
		let dayOfHalloween = new Date(
			`October 31, ${currentYear} 00:00:00`
		).getTime();
		// const today = new Date('July 7, 2022 23:59:45').getTime();
		const today = new Date().getTime();
		let secondsTillHalloween = dayOfHalloween - today;
		if (secondsTillHalloween < 0) {
			currentYear++;
			dayOfHalloween = new Date(
				`October 31, ${currentYear} 00:00:00`
			).getTime();
			secondsTillHalloween = dayOfHalloween - today;
		}
		const daysTillHalloween = Math.floor(
			secondsTillHalloween / 1000 / 60 / 60 / 24
		);
		console.log('daysTillHalloween', daysTillHalloween);

		return daysTillHalloween;
	}


function createStatusBarItem() {
	booStatusItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right
	);
	updateStatusBarItem();
}

function showStatusBarItem() {
	updateStatusBarItem();
	booStatusItem.show();
}

function updateStatusBarItem() {
	const booCountdown = getHalloweenCountdown();
	booStatusItem.text = `👻 ${booCountdown} days til Halloween!`;
	console.log('boo');
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
