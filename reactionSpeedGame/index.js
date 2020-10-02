"use strict";
const screenTag = document.querySelector("#screen");
const restartBtn = document.querySelector("#restartBtn");
let playCount = 0;
let date;
let total = 0;
let resultArr = [];
screenTag.addEventListener("click", () => {
  if (playCount >= 5) {
    return;
  }
  if (screenTag.classList.contains("first")) {
    screenTag.classList.replace("first", "waiting");
    screenTag.textContent = "Waiting green...";
    playGame();
  } else if (screenTag.classList.contains("waiting")) {
    return;
  } else if (screenTag.classList.contains("now")) {
    screenTag.classList.replace("now", "result");
    playCount++;
    const endDate = new Date();
    const result = endDate - date;
    resultArr.push(result);
    if (playCount < 5) {
      screenTag.textContent = `${result}ms`;
    } else {
      resultArr.forEach((n) => {
        total += n;
      });
      screenTag.classList.replace("now", "result");
      screenTag.textContent = `Finish! ${Math.floor(total / 5)}ms`;
      restartBtn.classList.add("showing");
    }
  } else if (screenTag.classList.contains("result")) {
    screenTag.classList.replace("result", "waiting");
    screenTag.textContent = "Waiting green...";
    playGame();
  }
});

function playGame() {
  setTimeout(() => {
    screenTag.classList.replace("waiting", "now");
    screenTag.textContent = "Click!";
    date = new Date();
  }, Math.floor(Math.random() * 5 + 1) * 500);
}

function resetGame() {
  screenTag.classList.replace("result", "first");
  screenTag.textContent = "Click to start";
  playCount = 0;
  resultArr = [];
  total = 0;
}

restartBtn.addEventListener("click", () => {
  resetGame();
  restartBtn.classList.remove("showing");
});
