const { default: fetch } = require("cross-fetch");
const BASE_URL = "https://boo-bot-server.herokuapp.com";

async function getThemes() {
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

async function getRandomFact() {
  const res = await fetch(`${BASE_URL}/api/v1/facts/random`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.ok) {
    const facts = await res.json();
    return facts;
  }
};

async function getRandomLink() {
  const res = await fetch(`${BASE_URL}/api/v1/links/random`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.ok) {
    const links = await res.json();
    return links;
  }
};


module.exports = { getThemes, getRandomFact, getRandomLink };