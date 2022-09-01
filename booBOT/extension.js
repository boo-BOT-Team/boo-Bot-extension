const vscode = require("vscode");
const { getRandomFact, getRandomLink } = require("./fetch-utils.js");
const getHalloweenCountdown = require("./halloweenCountdown.js");

/**
 * @param {vscode.ExtensionContext} context
 */

async function activate(context) {
  const daysTillHalloween = getHalloweenCountdown();

  getHalloweenCountdown();
  createStatusBarItem();
  showStatusBarItem();
  updateStatusBarOnWindowStateChange();

  async function startTimerFunction() {
    const oneMinute = 1000 * 60;
    const timeInterval = Number(
      vscode.workspace.getConfiguration("booBOT").get("timeInterval")
    );
    const booInterval = oneMinute * timeInterval;
    setInterval(async () => {
      const facts = await getRandomFact();
      const links = await getRandomLink();
      const response = await vscode.window.showInformationMessage(
        `BOO! ༼ つ ╹ ╹ ༽つ Did I scare you? Here's a spooky treat: ${facts.content} 
        Would you like an extra treat? `,
        "Take me to the treat!",
        "No, life is spooky enough."
      );
      if (response === "Take me to the treat!") {
        vscode.env.openExternal(vscode.Uri.parse(`${links.url}`));
      } else if (response === "No, life is spooky enough.") {
        vscode.window.showInformationMessage("Ok, see you next haunting...");
      }
    }, booInterval);
  }

  const response = await vscode.window.showInformationMessage(
    `Welcome to boo!BOT. There are ${daysTillHalloween} days until Halloween. 
    Would you like haunted enCounters today? `,
    "Spook me!",
    "No, life is spooky enough."
  );
  if (response === "Spook me!") {
    vscode.window.showInformationMessage("Ok, we'll haunt you shortly!");
    startTimerFunction();
  } else if (response === "No, life is spooky enough.") {
    vscode.window.showInformationMessage(
      "Ok, hope you don't have any boos in your code today!"
    );
  }

  let disposable = vscode.commands.registerCommand(
    "booBOT.helloWorld",
    function () {
      activate(context);
    }
  );

  const factCommand = vscode.commands.registerCommand(
    "booBOT.getRandomFactNow",
    function () {
      getRandomFactNow();
    }
  );

  const linkCommand = vscode.commands.registerCommand(
    "booBOT.getRandomLinkNow",
    function () {
      getRandomLinkNow();
    }
  );

  async function getRandomFactNow() {
    const facts = await getRandomFact();
    await vscode.window.showInformationMessage(
      `BOO! ༼ つ ╹ ╹ ༽つ Did I scare you? Here's a spooky treat: ${facts.content}`
    );
  }

  async function getRandomLinkNow() {
    const links = await getRandomLink();
    vscode.env.openExternal(vscode.Uri.parse(`${links.url}`));
  }

  context.subscriptions.push(disposable, factCommand, linkCommand);
}

let booStatusItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right
);

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
}

function updateStatusBarOnWindowStateChange() {
  vscode.window.onDidChangeWindowState((e) => {
    console.log(e);
    updateStatusBarItem();
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
