"use strict";
const tetris = document.querySelector("#tetris");
let tetrisData = [];
const block = [
  [
    {
      name: "s", // 네모
      numCode: 1,
      color: "red",
      shape: [
        [
          [0, 0, 0],
          [0, 1, 1],
          [0, 1, 1],
        ],
      ],
    },
  ],
  [
    {
      name: "t", // T자
      numCode: 2,
      color: "orange",
      shape: [
        [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0],
        ],
        [
          [0, 1, 0],
          [1, 1, 0],
          [0, 1, 0],
        ],
        [
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0],
        ],
        [
          [0, 1, 0],
          [0, 1, 1],
          [0, 1, 0],
        ],
      ],
    },
  ],
  [
    {
      name: "ㅣ", //L자
      numCode: 3,
      color: "yellow",
      shape: [
        [
          [0, 0, 0],
          [1, 0, 0],
          [1, 1, 1],
        ],
        [
          [1, 1, 0],
          [1, 0, 0],
          [1, 0, 0],
        ],
        [
          [1, 1, 1],
          [0, 0, 1],
          [0, 0, 0],
        ],
        [
          [0, 0, 1],
          [0, 0, 1],
          [0, 1, 1],
        ],
      ],
    },
  ],
  [
    {
      name: "rl", // reverse L
      numCode: 4,
      color: "green",
      shape: [
        [
          [0, 0, 0],
          [0, 0, 1],
          [1, 1, 1],
        ],
        [
          [1, 0, 0],
          [1, 0, 0],
          [1, 1, 0],
        ],
        [
          [1, 1, 1],
          [1, 0, 0],
          [0, 0, 0],
        ],
        [
          [0, 1, 1],
          [0, 0, 1],
          [0, 0, 1],
        ],
      ],
    },
  ],
  [
    {
      name: "z",
      numCode: 5,
      color: "blue",
      shape: [
        [
          [0, 0, 0],
          [1, 1, 0],
          [0, 1, 1],
        ],
        [
          [0, 1, 0],
          [1, 1, 0],
          [1, 0, 0],
        ],
        [
          [1, 1, 0],
          [0, 1, 1],
          [0, 0, 0],
        ],
        [
          [0, 0, 1],
          [0, 1, 1],
          [0, 1, 0],
        ],
      ],
    },
  ],
  [
    {
      name: "rz", //reverse Z
      numCode: 6,
      color: "aqua",
      shape: [
        [
          [0, 0, 0],
          [0, 1, 1],
          [1, 1, 0],
        ],
        [
          [1, 0, 0],
          [1, 1, 0],
          [0, 1, 0],
        ],
        [
          [0, 1, 1],
          [1, 1, 0],
          [0, 0, 0],
        ],
        [
          [0, 1, 0],
          [0, 1, 1],
          [0, 0, 1],
        ],
      ],
    },
  ],
  [
    {
      name: "i", // I
      numCode: 7,
      color: "fuchsia",
      shape: [
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
        ],
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ],
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],
        ],
      ],
    },
  ],
];
let currentBlock;
let currentPosition;
function canMoveCheck() {}
function tick() {
  if (canGo(currentBlock)) {
  }
  draw();
}
function draw() {
  tetrisData.forEach((tr, i) => {
    tr.forEach((td, j) => {
      if (td < 10 && td !== 0) {
        tetris.children[i].children[j].classList.add(
          `${currentBlock[0].color}`
        );
      } else if (td === 0) {
        tetris.children[i].children[j].className = "";
      }
    });
  });
}
function init() {
  const fragment = document.createDocumentFragment();
  [...Array(20).keys()].forEach(() => {
    const tr = document.createElement("tr");
    fragment.appendChild(tr);
    [...Array(10).keys()].forEach(() => {
      const td = document.createElement("td");
      tr.appendChild(td);
    });
    let column = [...Array(10).keys()].fill(0);
    tetrisData.push(column);
  });
  tetris.appendChild(fragment);
}
function generate() {
  if (!currentBlock) {
    currentBlock = block[Math.floor(Math.random() * block.length)];
    console.log(currentBlock[0].shape[0]);
  }
  currentPosition = [-1, 3];
  currentBlock[0].shape[0].slice(1).forEach((col, i) => {
    col.forEach((row, j) => {
      if (row) {
        tetrisData[i][3 + j] = currentBlock[0].numCode;
      }
    });
  });
  draw();
}
function canGo(block) {
  let flag = true;
  const num = block[0].numCode;
  const nextPosition = [currentPosition[0] + 1, currentPosition[1]];
  let newPosition = [];
  if (num < 7) {
    if (currentPosition[0] + 3 === tetrisData.length - 1) {
      return false;
    } else {
      for (let i = 0; i < 3; i++) {
        const data = tetrisData[nextPosition[0] + i].slice(
          nextPosition[1],
          nextPosition[1] + 3
        );
        newPosition.push(data);
      }
      console.log(newPosition, "newPosition");
      newPosition.forEach((col) => {
        col.forEach((row) => {
          if (row > 10) {
            flag = false;
          }
        });
      });
    }
  } else {
    if (currentPosition[0] + 4 === tetrisData.length - 1) {
      return false;
    } else {
      for (let i = 0; i < 4; i++) {
        const data = tetrisData[nextPosition[0] + i].slice(
          nextPosition[1],
          nextPosition[1] + 4
        );
        newPosition.push(data);
      }
      console.log(newPosition, "newPosition");
      newPosition.forEach((col) => {
        col.forEach((row) => {
          if (row > 10) {
            flag = false;
          }
        });
      });
    }
    return flag;
  }
}
// let blockDown = setInterval(tick, 200);
init();
generate();
