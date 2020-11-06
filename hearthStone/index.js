"use strict";
const rival = {
  deckTag: document.querySelector(".rival-deck"),
  fieldTag: document.querySelector(".rival-field"),
  heroTag: document.querySelector(".rival-hero"),
  hero: undefined,
  deckData: [],
  fieldData: [],
};
const my = {
  deckTag: document.querySelector(".my-deck"),
  fieldTag: document.querySelector(".my-field"),
  heroTag: document.querySelector(".my-hero"),
  hero: undefined,
  deckData: [],
  fieldData: [],
};

function Card(hero) {
  if (hero) {
    this.hero = true;
    this.att = 1;
    this.hp = Math.ceil(Math.random() + 29);
  } else {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.ceil((this.att + this.hp) / 2);
  }
}

function cardFactory(hero) {
  return new Card(hero);
}

function showCard(data) {
  const card = document.querySelector(".hidden .card").cloneNode(true);
  if (data.cost) {
    // 영웅인 경우 코스트 부분을 없앤다.
    card.querySelector(".card-cost").textContent = data.cost;
  } else {
    card.querySelector(".card-cost").classList.remove("card-cost");
  }
  card.querySelector(".card-hp").textContent = data.hp;
  card.querySelector(".card-att").textContent = data.att;
  return card;
}

function makeDeck(count, who) {
  const whoIs = who ? my : rival;
  for (let i = 0; i < count; i++) {
    whoIs.deckData.push(cardFactory());
  }
  whoIs.deckData.forEach((data) => {
    whoIs.deckTag.appendChild(showCard(data));
  });
}
function makeHero(who) {
  const whoIs = who ? my : rival;
  whoIs.hero = cardFactory(true);
  whoIs.heroTag.appendChild(showCard(whoIs.hero));
}
function init() {
  makeDeck(5, true);
  makeDeck(5, false);
  makeHero(true);
  makeHero(false);
}
init();
