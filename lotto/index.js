"use strict";
const prizeTag = document.querySelector(".prize");
const bonusTag = document.querySelector(".bonus");

const candidate = Array(45)
  .fill()
  .map((n, i) => (n = i + 1));

const suffle = [];

while (candidate.length > 0) {
  suffle.push(
    candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
  );
}

const prizeBall = suffle.splice(0, 6).sort((p, c) => p - c);
const bonusBall = suffle[7];

function changeBallColor(number, tag) {
  if (number <= 10) {
    tag.style.backgroundColor = "red";
    tag.style.color = "white";
  } else if (number <= 20) {
    tag.style.backgroundColor = "orange";
  } else if (number <= 30) {
    tag.style.backgroundColor = "yellow";
  } else if (number <= 40) {
    tag.style.backgroundColor = "blue";
    tag.style.color = "white";
  } else {
    tag.style.backgroundColor = "green";
    tag.style.color = "white";
  }
}

prizeBall.forEach((number, index) => {
  setTimeout(() => {
    const ball = document.createElement("div");
    ball.textContent = number;
    ball.className = "ball";
    changeBallColor(number, ball);
    prizeTag.appendChild(ball);
  }, 1000 * (index + 1));
});

setTimeout(() => {
  const ball = document.createElement("div");
  ball.textContent = bonusBall;
  ball.className = "ball";
  changeBallColor(bonusBall, ball);
  bonusTag.appendChild(ball);
}, 1000 * 7);
