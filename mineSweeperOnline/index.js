"use strict";
const startBtn = document.querySelector("#startBtn");
const tbody = document.querySelector("tbody");

let dataset = [];
function makeGame(width, height, mine) {
  tbody.innerHTML = "";
  dataset = [];
  let i, j, temp;
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
  console.log(mineNumber);
  for (i = 0; i < width; i++) {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);
    let arr = [];
    dataset.push(arr);
    for (j = 0; j < height; j++) {
      temp = i * 10 + j;
      const td = document.createElement("td");
      td.id = "gameButton";
      if (mineNumber.includes(temp)) {
        arr.push("X");
        td.textContent = "X";
      } else {
        arr.push(1);
      }
      td.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const tbody = e.target.parentNode.parentNode;
        const tr = e.target.parentNode;
        const width = Array.prototype.indexOf.call(tbody.children, tr);
        const height = Array.prototype.indexOf.call(tr.children, td);
        const value = e.target.textContent;
        if (value === "" || value === "X") {
          e.target.textContent = "!";
        } else if (value === "!") {
          e.target.textContent = "?";
        } else if (value === "?") {
          if (dataset[width][height] === 1) {
            e.target.textContent = "";
          } else {
            e.target.textContent = "X";
          }
        }
      });
      td.addEventListener("click", (e) => {
        const tbody = e.target.parentNode.parentNode;
        const tr = e.target.parentNode;
        const width = Array.prototype.indexOf.call(tbody.children, tr);
        const height = Array.prototype.indexOf.call(tr.children, td);
        if (td.textContent === "X") {
          td.textContent = "펑";
        } else {
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
          td.textContent = mineAmount;
        }
      });
      tr.appendChild(td);
    }
  }
}

startBtn.addEventListener("click", () => {
  const gameWidth = document.querySelector("#width").value;
  const gameHeight = document.querySelector("#height").value;
  const gameMine = document.querySelector("#mine").value;
  if (gameWidth && gameHeight && gameMine) {
    makeGame(gameWidth, gameHeight, gameMine);
  }
});
