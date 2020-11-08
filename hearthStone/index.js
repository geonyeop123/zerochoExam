"use strict";
const rival = {
  deckTag: document.querySelector(".rival-deck"),
  fieldTag: document.querySelector(".rival-field"),
  heroTag: document.querySelector(".rival-hero"),
  stageTag: document.querySelector(".rival-stage"),
  hero: undefined,
  deckData: [],
  fieldData: [],
  cost: document.querySelector(".rival-cost"),
};
const my = {
  deckTag: document.querySelector(".my-deck"),
  fieldTag: document.querySelector(".my-field"),
  heroTag: document.querySelector(".my-hero"),
  stageTag: document.querySelector(".my-stage"),
  hero: undefined,
  deckData: [],
  fieldData: [],
  cost: document.querySelector(".my-cost"),
};
const player = [my, rival];
let chooseCard;
let turn;
document.querySelector(".turnButton").addEventListener("click", () => {
  const whoIs = turn ? my : rival;
  turn = !turn;
  whoIs.cost.innerText = 10;
  my.stageTag.classList.toggle("turn");
  rival.stageTag.classList.toggle("turn");
  whoIs.stageTag.querySelectorAll(".card").forEach((card) => {
    // 액션 CSS 제거
    if (card.classList.contains("selectCard")) {
      card.classList.remove("selectCard");
    }
    if (card.classList.contains("turnOverCard")) {
      card.classList.remove("turnOverCard");
    }
  });
});
function resetGame() {
  player.forEach((i) => {
    i.deckTag.innerHTML = "";
    i.fieldTag.innerHTML = "";
    i.heroTag.innerHTML = "";
    i.hero = undefined;
    i.deckData = [];
    i.fieldData = [];
    i.cost.textContent = 10;
    if (i.stageTag.classList.contains("turn")) {
      i.stageTag.classList.remove("turn");
    }
    if (i.stageTag.classList.contains("turnOverCard")) {
      i.stageTag.classList.remove("turnOverCard");
    }
  });
  startGame();
}
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
function linkCard(data, place) {
  // data와 HTML 연결
  const card = document.querySelector(".hidden .card").cloneNode(true);
  if (data.cost) {
    // 영웅인 경우 코스트 부분을 없앤다.
    card.querySelector(".card-cost").textContent = data.cost;
  } else {
    card.querySelector(".card-cost").classList.remove("card-cost");
  }
  card.querySelector(".card-hp").textContent = data.hp;
  card.querySelector(".card-att").textContent = data.att;
  card.addEventListener("click", () => {
    const whoIs = turn ? my : rival;
    const enemy = !turn ? my : rival;
    if (whoIs.deckData.includes(data)) {
      // 자신의 덱의 카드를 선택 시 카드 소환
      const liveCost = whoIs.cost.innerText;
      if (liveCost < data.cost) {
        return;
      } else {
        whoIs.cost.innerText = Number(liveCost) - data.cost;
        const index = whoIs.deckData.indexOf(data);
        whoIs.fieldData.push(data);
        whoIs.deckData.splice(index, 1);
        linkCard(data, whoIs.fieldTag);
        card.parentNode.innerHTML = "";
        makeDeck(1, turn);
        return;
      }
    }
    if (whoIs.fieldData.includes(data) || whoIs.hero === data) {
      // 내 필드의 카드 선택 시
      whoIs.stageTag.querySelectorAll(".card").forEach((n) => {
        if (n.classList.contains("selectCard")) {
          n.classList.remove("selectCard");
        }
      });
      card.classList.add("selectCard");
      if (!card.classList.contains("turnOverCard")) {
        // 턴오버된 카드가 아닐 시 카드 선택
        chooseCard = data;
      }
      return;
    }
    if (chooseCard && (enemy.fieldData.includes(data) || enemy.hero === data)) {
      // 선택된 카드가 있고, 상대의 필드에 있는 카드를 선택 시
      data.hp = data.hp - chooseCard.att;
      card.querySelector(".card-hp").innerText = data.hp;
      if (data.hp <= 0) {
        if (data.hero) {
          enemy.stageTag.classList.add("turnOverCard");
          setTimeout(() => {
            alert("승리");
            resetGame();
          }, 500);
        } else {
          const index = enemy.fieldData.indexOf(data);
          enemy.fieldData.splice(index, 1);
          enemy.fieldTag.innerHTML = "";
          enemy.fieldData.forEach((n) => {
            linkCard(n, enemy.fieldTag);
          });
        }
      }
      whoIs.stageTag.querySelectorAll(".card").forEach((n) => {
        if (n.classList.contains("selectCard")) {
          n.classList.remove("selectCard");
          n.classList.add("turnOverCard");
        }
      });
      chooseCard = undefined;
    }
    return;
  });
  place.appendChild(card);
}
function makeDeck(count, who) {
  const whoIs = who ? my : rival;
  for (let i = 0; i < count; i++) {
    whoIs.deckData.push(cardFactory());
  }
  whoIs.deckData.forEach((data) => {
    linkCard(data, whoIs.deckTag);
  });
}
function makeHero(who) {
  const whoIs = who ? my : rival;
  whoIs.hero = cardFactory(true);
  linkCard(whoIs.hero, whoIs.heroTag);
}
function startGame() {
  makeDeck(5, true);
  makeDeck(5, false);
  makeHero(true);
  makeHero(false);
  turn = true;
  my.stageTag.classList.add("turn");
}
function init() {
  startGame();
}
init();
