"use strict";
const tetris = document.querySelector("#tetris");
let tetrisData = [];
const color = ["red", "orange", "yellow", "green", "blue", "aqua", "fuchsia"];
const block = [
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
  {
    name: "t", // T자
    numCode: 2,
    color: "orange",
    shape: [
      // 방향은 시계방향
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
  {
    name: "z", // Z자
    numCode: 3,
    color: "yellow",
    shape: [
      // 방향은 시계방향
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
  {
    name: "rz", // 역Z자
    numCode: 4,
    color: "green",
    shape: [
      // 방향은 시계방향
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
  {
    name: "l", // L자
    numCode: 5,
    color: "blue",
    shape: [
      // 방향은 시계방향
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: "rl", // 역L자
    numCode: 6,
    color: "aqua",
    shape: [
      // 방향은 시계방향
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ],
  },
  {
    name: "i", // I자
    numCode: 7,
    color: "fuchsia",
    shape: [
      // 방향은 시계방향
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
];
let currentBlock;
function init() {
  const fragment = document.createDocumentFragment();
  [...Array(20).keys()].forEach(() => {
    const tr = document.createElement("tr");
    [...Array(10).keys()].forEach(() => {
      const td = document.createElement("td");
      tr.appendChild(td);
    });
    const column = [...Array(10).keys()].fill(0);
    tetrisData.push(column);
    fragment.appendChild(tr);
  });
  tetris.appendChild(fragment);
}
function draw() {
  tetrisData.forEach((tr, i) => {
    tr.forEach((td, j) => {
      if (td < 10 && !(td === 0)) {
        tetris.children[i].children[j].classList.add(`${currentBlock.color}`);
      } else if (td === 0) {
        tetris.children[i].children[j].className = "";
      }
    });
  });
}
function generate() {
  if (!currentBlock) {
    currentBlock = block[Math.floor(Math.random() * block.length)];
  }
  console.log(currentBlock.shape[0].slice(1));
  currentBlock.shape[0].slice(1).forEach((col, i) => {
    col.forEach((row, j) => {
      if (row) {
        tetrisData[i][j + 3] = currentBlock.numCode;
      }
    });
  });
  draw();
}
function tick() {}
init();
generate();
