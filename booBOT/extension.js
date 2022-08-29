// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "booBOT" is now active!');

	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('booBOT.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		
		const myName = 'sebastian'
		const dayOfHalloween = new Date('October 31, 2022 12:00:00').getTime();
		const today = new Date().getTime();
		const secondsTillHalloween = dayOfHalloween - today;
		const daysTillHalloween = Math.floor((secondsTillHalloween / 1000 / 60 / 60 / 24));
		console.log('daysTillHalloween', daysTillHalloween);
		// Display a message box to the user
		vscode.window.showInformationMessage(`Welcome to boo!BOT... would like haunted enCounters today? ${myName} days until halloween ${daysTillHalloween}`, 'Yes', 'no');
	}); 

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
