"use strict";
const tetris = document.querySelector("#tetris");
let tetrisData = [];
let currentBlock;
let currentPosition;
let currentBlockIndex;
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
function tick() {
  currentPosition[0] += 1;
  let canGo = true;
  if (currentBlock.numCode < 7) {
    if (currentPosition[0] + 3 > tetrisData.length) {
      // 스테이지 끝인가?
      canGo = false;
    } else {
      for (let i = currentPosition[0]; i < currentPosition[0] + 3; i++) {
        // 다른 블록이 있는가?
        for (let j = currentPosition[1]; j < currentPosition[1] + 3; j++) {
          if (tetrisData[i][j] > 10) {
            canGo = false;
          }
        }
      }
    }
  }
  if (canGo) {
    if (tetrisData[currentPosition[0] - 1]) {
      for (
        let i = currentPosition[0] - 1;
        i < currentPosition[0] - 1 + 3;
        i++
      ) {
        for (let j = currentPosition[1]; j < currentPosition[1] + 3; j++) {
          tetrisData[i][j] = 0;
        }
      }
    } else {
      for (let i = currentPosition[0]; i < currentPosition[0] - 1 + 2; i++) {
        for (let j = currentPosition[1]; j < currentPosition[1] + 3; j++) {
          tetrisData[i][j] = 0;
        }
      }
    }
    currentBlock.shape[currentBlockIndex].forEach((col, i) => {
      col.forEach((row, j) => {
        if (row) {
          tetrisData[currentPosition[0] + i][currentPosition[1] + j] = row;
        }
      });
    });
    draw();
  } else {
    generate();
  }
}
function draw() {
  tetrisData.forEach((col, i) => {
    col.forEach((row, j) => {
      if (row === 0) {
        tetris.children[i].children[j].className = "";
      } else if (row < 10) {
        tetris.children[i].children[j].classList.add(`${currentBlock.color}`);
      }
    });
  });
}
function init() {
  const fragment = document.createDocumentFragment();
  [...Array(20).keys()].forEach((col, i) => {
    const tr = document.createElement("tr");
    [...Array(10).keys()].forEach((row, j) => {
      const td = document.createElement("td");
      tr.appendChild(td);
    });
    const column = [...Array(10).keys()].fill(0);
    fragment.appendChild(tr);
    tetrisData.push(column);
  });
  tetris.appendChild(fragment);
}
function generate() {
  currentBlock = block[Math.floor(Math.random() * block.length)][0];
  currentPosition = [-1, 3];
  currentBlockIndex = 0;
  console.log(currentBlock);
  currentBlock.shape[0].slice(1).forEach((col, i) => {
    col.forEach((row, j) => {
      if (row) {
        tetrisData[i][j + 3] = row;
      }
    });
  });
  draw();
}
init();
generate();
