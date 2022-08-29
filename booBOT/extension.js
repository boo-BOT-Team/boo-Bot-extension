const vscode = require("vscode");
const getThemes = require("./fetch-utils.js");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  getThemes().then(console.log);

  const themes = await getThemes();
  console.log("themes", themes);

  function getHalloweenCountdown() {
    const dayOfHalloween = new Date("October 31, 2022 12:00:00").getTime();
    const today = new Date().getTime();
    const secondsTillHalloween = dayOfHalloween - today;
    const daysTillHalloween = Math.floor(
      secondsTillHalloween / 1000 / 60 / 60 / 24
    );
    return daysTillHalloween;
  }
  const daysTillHalloween = getHalloweenCountdown();

  let disposable = vscode.commands.registerCommand(
    "booBOT.helloWorld",

    async function responseFunction() {
      console.log("daysTillHalloween", daysTillHalloween);
      const response = await vscode.window.showInformationMessage(
        `Welcome to boo!BOT. There are ${daysTillHalloween} days until Halloween. Would you like haunted enCounters today? `,
        "Spook me!",
        "No, life is spooky enough."
      );
      if (response === "Spook me!") {
        vscode.window.showInformationMessage("Ok, we'll haunt you shortly!");
      } else if (response === "No, life is spooky enough.") {
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
