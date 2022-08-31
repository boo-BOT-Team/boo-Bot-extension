// // above activate function

// let booStatusItem = vscode.window.createStatusBarItem(
// 	vscode.StatusBarAlignment.Right
// );

// // very top of activate

// getHalloweenCountdown();
// createStatusBarItem();

// // context.subscriptions.push(booStatusItem);

// context.subscriptions.push(
// 	vscode.window.onDidChangeWindowState(updateStatusBarItem)
// );

// context.subscriptions.push(
// 	vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
// );

// // below activate

// function getHalloweenCountdown() {
// 	const editor = vscode.window.activeTextEditor;
// 	if (editor) {
// 		let currentYear = new Date().getFullYear();
// 		let dayOfHalloween = new Date(
// 			`October 31, ${currentYear} 12:00:00`
// 		).getTime();
// 		const today = new Date('July 7, 2022 11:59:50').getTime();
// 		// const today = new Date().getTime();
// 		let secondsTillHalloween = dayOfHalloween - today;
// 		if (secondsTillHalloween < 0) {
// 			currentYear++;
// 			dayOfHalloween = new Date(
// 				`October 31, ${currentYear} 12:00:00`
// 			).getTime();
// 			secondsTillHalloween = dayOfHalloween - today;
// 		}
// 		const daysTillHalloween = Math.floor(
// 			secondsTillHalloween / 1000 / 60 / 60 / 24
// 		);
// 		console.log('daysTillHalloween', daysTillHalloween);

// 		return daysTillHalloween;
// 	}
// }

// function createStatusBarItem() {
// 	booStatusItem = vscode.window.createStatusBarItem(
// 		vscode.StatusBarAlignment.Right
// 	);
// 	updateStatusBarItem();
// }

// function updateStatusBarItem() {
// 	const booCountdown = getHalloweenCountdown(vscode.window.activeTextEditor);
// 	booStatusItem.text = `👻 ${booCountdown} days til Halloween!`;
// 	booStatusItem.show();
// }
