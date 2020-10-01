"use strict";
const startBtn = document.querySelector("#startBtn");
const tbody = document.querySelector("tbody");
const resultTag = document.querySelector("#result");
const timerTag = document.querySelector(".timer");
let blockAmount, openBlock;
let dataset = [];
let gamePlay = 1;
const dataValue = {
  default: 0,
  mine: "X",
  open: 1,
};

function makeGame(width, height, mine) {
  resetGame(width, height, mine);
  let i,
    j,
    temp = 0;
  let condidate = Array(width * height)
    .fill()
    .map((n, index) => {
      return index;
    });
  let mineNumber = [];
  while (mineNumber.length < mine) {
    mineNumber.push(
      condidate.splice(Math.floor(Math.random() * condidate.length), 1)[0]
    );
  }
  for (i = 0; i < width; i++) {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);
    let arr = [];
    dataset.push(arr);
    for (j = 0; j < height; j++) {
      temp++;
      const td = document.createElement("td");
      td.id = "gameButton";
      if (mineNumber.includes(temp)) {
        arr.push(dataValue.mine);
        // td.textContent = "X";
      } else {
        arr.push(dataValue.default);
      }
      td.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (!gamePlay) {
          return;
        }
        const tbody = e.target.parentNode.parentNode;
        const tr = e.target.parentNode;
        const width = Array.prototype.indexOf.call(tbody.children, tr);
        const height = Array.prototype.indexOf.call(tr.children, td);
        const value = e.target.textContent;
        if (value === "" || value === "X") {
          e.target.textContent = "!";
          e.target.classList.add("flag");
        } else if (value === "!") {
          e.target.textContent = "?";
        } else if (value === "?") {
          if (
            dataset[width][height] === dataValue.default ||
            dataset[width][height] === dataValue.open
          ) {
            e.currentTarget.textContent = "";
            e.target.classList.remove("flag");
          } else if (dataset[width][height] === dataValue.mine) {
            e.target.textContent = "";
            e.target.classList.remove("flag");
          }
        }
      });
      td.addEventListener("click", (e) => {
        const tbody = e.target.parentNode.parentNode;
        const tr = e.target.parentNode;
        const width = Array.prototype.indexOf.call(tbody.children, tr);
        const height = Array.prototype.indexOf.call(tr.children, td);
        const blockValue = e.target.textContent;
        if (
          dataset[width][height] === dataValue.open ||
          blockValue === "?" ||
          blockValue === "!" ||
          !gamePlay
        ) {
          return;
        }
        e.currentTarget.classList.add("opened");
        openBlock++;
        if (openBlock === blockAmount) {
          resultTag.textContent = "승리!";
          timerTag.textContent = "WIN";
        }
        if (dataset[width][height] === dataValue.mine) {
          td.textContent = "X";
          setTimeout(() => {
            if (
              window.confirm("패배하셨습니다. 다시 하시겠습니까??") === true
            ) {
              startBtn.click();
            } else {
              gamePlay = 0;
            }
          }, 100);
        } else {
          td.textContent = `${
            searchMine(width, height) === 0 ? "" : searchMine(width, height)
          }`;
        }
      });
      tr.appendChild(td);
    }
  }
}

function resetGame(width, height, mine) {
  blockAmount = width * height - mine;
  openBlock = 0;
  tbody.innerHTML = "";
  dataset = [];
  resultTag.textContent = "";
  timerTag.textContent = 99;
  gamePlay = 1;
}

function searchMine(width, height) {
  dataset[width][height] = dataValue.open;
  let aroundMine = [
    dataset[width][height - 1],
    dataset[width][height],
    dataset[width][height + 1],
  ];
  if (dataset[width - 1]) {
    aroundMine = aroundMine.concat([
      dataset[width - 1][height - 1],
      dataset[width - 1][height],
      dataset[width - 1][height + 1],
    ]);
  }
  if (dataset[width + 1]) {
    aroundMine = aroundMine.concat([
      dataset[width + 1][height - 1],
      dataset[width + 1][height],
      dataset[width + 1][height + 1],
    ]);
  }
  const mineAmount = aroundMine.filter((n) => {
    return n === "X";
  }).length;
  if (mineAmount === 0) {
    let aroundBlock = [
      tbody.children[width].children[height - 1],
      tbody.children[width].children[height],
      tbody.children[width].children[height + 1],
    ];
    if (tbody.children[width - 1]) {
      aroundBlock = aroundBlock.concat([
        tbody.children[width - 1].children[height - 1],
        tbody.children[width - 1].children[height],
        tbody.children[width - 1].children[height + 1],
      ]);
    }
    if (tbody.children[width + 1]) {
      aroundBlock = aroundBlock.concat([
        tbody.children[width + 1].children[height - 1],
        tbody.children[width + 1].children[height],
        tbody.children[width + 1].children[height + 1],
      ]);
    }
    aroundBlock
      .filter((v) => !!v)
      .forEach((around) => {
        around.click();
      });
  }
  return mineAmount;
}

startBtn.addEventListener("click", () => {
  const gameWidth = document.querySelector("#width").value;
  const gameHeight = document.querySelector("#height").value;
  const gameMine = document.querySelector("#mine").value;
  if (gameWidth && gameHeight && gameMine) {
    makeGame(gameWidth, gameHeight, gameMine);
  }
});
