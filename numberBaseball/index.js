"use strict";
const answerText = document.querySelector("#answerText");
const resultText = document.querySelector("#resultText");
const submitButton = document.querySelector("#submit");
const stateText = document.querySelector("#stateText");
const input = document.querySelector("input");
const pastResult = document.querySelector("#pastResult");
let count = 0;
let answer = [];
let game = true;
for (let i = 0; i < 3; i++) {
  let randomNumber = Math.floor(Math.random() * 9 + 1).toString();
  if (i == 0) {
    answer.push(randomNumber);
  } else {
    while (answer.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 9 + 1).toString();
    }
    answer.push(randomNumber);
  }
}
function whiteState(count) {
  stateText.textContent = `${count}회 시도입니다.`;
}

function compareNumber(result, answer) {
  let totalCount = 0;
  let strikeCount = 0;
  let ballCount = 0;
  result.forEach((number) => {
    if (answer.includes(number)) {
      totalCount++;
      if (result.indexOf(number) === answer.indexOf(number)) {
        strikeCount++;
      } else {
        ballCount++;
      }
    }
  });
  if (totalCount === 0) {
    resultText.textContent = "OUT!!";
    whiteState(count);
  } else if (strikeCount === 3) {
    game = false;
  } else {
    resultText.textContent = `${strikeCount}S ${ballCount}B`;
    whiteState(count);
  }
}

function whitePastResult(result) {
  const span = document.createElement("span");
  const resultTextValue = resultText.textContent;
  span.textContent = `${result} ${resultTextValue}`;
  pastResult.appendChild(span);
}
function gameClear() {
  stateText.textContent = null;
  resultText.textContent = `축하합니다! ${count}회 만에 성공하셨습니다!`;
  answerText.textContent = `${answer[0]} ${answer[1]} ${answer[2]}`;
}

function enterkey() {
  if (window.event.keyCode == 13) {
    playGame();
  }
}

function playGame() {
  const inputValue = input.value;
  input.value = "";
  if (inputValue) {
    const result = inputValue.toString().split("");
    if (result.length !== 3) {
      stateText.textContent = "3자리의 숫자만 입력해주세요.";
    } else {
      count++;
      compareNumber(result, answer);
      if (game === true) {
        whitePastResult(inputValue);
      } else {
        gameClear();
      }
    }
  }
}
submitButton.addEventListener("click", playGame);
