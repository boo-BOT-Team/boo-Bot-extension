const { default: fetch } = require("cross-fetch");
const BASE_URL = "https://boo-bot-server.herokuapp.com";

module.exports = async function getThemes() {
  const res = await fetch(`${BASE_URL}/api/v1/themes`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.ok) {
    const themes = await res.json();
    return themes;
  }
};
