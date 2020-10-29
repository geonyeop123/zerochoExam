"use strict";
const width = 3;
const height = 4;
let count = 0;
let pairCard = 0;
let pastChooseColor;
let openCard = [];
let openedCard = [];
function makeCard(width, height) {
  let condidate = [
    "red",
    "red",
    "yellow",
    "yellow",
    "green",
    "green",
    "purple",
    "purple",
    "aqua",
    "aqua",
    "orange",
    "orange",
  ];
  let color = [];
  while (condidate.length > 0) {
    color.push(
      condidate.splice(Math.floor(Math.random() * condidate.length), 1)[0]
    );
  }
  for (let i = 0; i < width; i++) {
    const body = document.body;
    const column = document.createElement("div");
    column.className = "column";
    for (let j = 0; j < height; j++) {
      const insertColor = color.splice(0, 1);
      const card = document.createElement("div");
      card.className = "card";
      const cardInner = document.createElement("div");
      cardInner.className = "card-inner";
      const cardFront = document.createElement("div");
      cardFront.className = "card-front";
      const cardBack = document.createElement("div");
      cardBack.className = "card-back";
      cardBack.style.backgroundColor = insertColor[0];
      card.appendChild(cardInner);
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      (function (c) {
        card.addEventListener("click", (e) => {
          const clickCard = e.target.parentNode.children[1];
          const chooseColor = clickCard.style.backgroundColor;
          const thisCard = e.target.parentNode.parentNode;
          if (openCard.includes(thisCard) || openedCard.includes(thisCard)) {
            return;
          }
          c.classList.toggle("flipped");
          count++;
          openCard.push(thisCard);
          if (count === 1) {
            pastChooseColor = chooseColor;
          } else if (count === 2) {
            if (pastChooseColor === chooseColor) {
              pairCard++;
              count = 0;
              pastChooseColor = undefined;

              openCard.forEach((n) => {
                openedCard.push(n);
              });
              openCard = [];
            } else {
              count = 0;
              pastChooseColor = undefined;
              setTimeout(() => {
                openCard.forEach((n) => {
                  n.classList.toggle("flipped");
                  console.log(n);
                });
                openCard = [];
              }, 700);
            }
          }
          if (pairCard === 6) {
            setTimeout(() => {
              alert("모두 맞추셨습니다!!");
              openedCard.forEach((n) => {
                n.classList.toggle("flipped");
              });
            }, 500);
          }
        });
      })(card);
      column.appendChild(card);
    }
    body.appendChild(column);
  }
}
makeCard(width, height);
