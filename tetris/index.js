"use strict";
const tetris = document.querySelector("#tetris");
const next = document.querySelector("#next").querySelector("tbody");
let tetrisData = [];
let currentBlock;
let nextBlock;
let currentPosition;
let currentBlockIndex;
let stopFlag = false;
let gameOver = false;
const derection = {
  down: 0,
  left: 1,
  right: 2,
};
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
function checkMove(block, derection) {
  let pastPosition = [];
  currentPosition.forEach((n) => {
    pastPosition.push(n);
  });
  switch (derection) {
    case 0: // down
      currentPosition[0] += 1;
      break;
    case 1: // left
      currentPosition[1] -= 1;
      break;
    case 2: // right
      currentPosition[1] += 1;
      break;
  }
  let canGo = true;
  block.shape[currentBlockIndex].forEach((col, i) => {
    // 스테이지의 끝인가 ?
    col.forEach((row, j) => {
      if (row && !tetrisData[currentPosition[0] + i]) {
        canGo = false;
      } else if (
        row &&
        tetrisData[currentPosition[0] + i][currentPosition[1] + j] === undefined
      ) {
        canGo = false;
      }
    });
  });
  if (canGo) {
    block.shape[currentBlockIndex].forEach((col, i) => {
      // 블록이 있는가?
      col.forEach((row, j) => {
        if (
          row &&
          tetrisData[currentPosition[0] + i][currentPosition[1] + j] >= 10
        ) {
          canGo = false;
        }
      });
    });
  }
  if (canGo) {
    if (tetrisData[pastPosition[0]]) {
      for (
        let i = pastPosition[0];
        i < pastPosition[0] + currentBlock.shape[0].length;
        i++
      ) {
        for (
          let j = pastPosition[1];
          j < pastPosition[1] + currentBlock.shape[0].length;
          j++
        ) {
          if (!tetrisData[i]) {
            continue;
          }
          if (tetrisData[i][j] < 10) {
            tetrisData[i][j] = 0;
          }
        }
      }
    } else {
      for (
        let i = pastPosition[0] + 1;
        i < pastPosition[0] + currentBlock.shape[0].length;
        i++
      ) {
        for (
          let j = pastPosition[1];
          j < pastPosition[1] + currentBlock.shape[0].length;
          j++
        ) {
          if (tetrisData[i][j] < 10) {
            tetrisData[i][j] = 0;
          }
        }
      }
    }
  }
  if (!canGo) {
    switch (derection) {
      case 0: // down
        currentPosition[0] -= 1;
        break;
      case 1: // left
        currentPosition[1] += 1;
        break;
      case 2: // right
        currentPosition[1] -= 1;
        break;
    }
  }
  return canGo;
}

function tick() {
  let canGo = checkMove(currentBlock, derection.down);
  if (canGo) {
    currentBlock.shape[currentBlockIndex].forEach((col, i) => {
      col.forEach((row, j) => {
        if (row) {
          tetrisData[currentPosition[0] + i][currentPosition[1] + j] =
            currentBlock.numCode;
        }
      });
    });
    draw();
    return true;
  } else {
    currentBlock.shape[currentBlockIndex].forEach((col, i) => {
      col.forEach((row, j) => {
        if (row) {
          tetrisData[currentPosition[0] + i][currentPosition[1] + j] *= 10;
        }
      });
    });
    tetrisData.forEach((col, i) => {
      let count = 0;
      col.forEach((row, j) => {
        if (row === 0) {
          count++;
        }
      });
      if (count === 0) {
        console.log(tetrisData.splice(i, 1));
        const column = [...Array(10).keys()].fill(0);
        tetrisData.unshift(column);
        tetris.removeChild(tetris.children[i]);
        const tr = document.createElement("tr");
        [...Array(10).keys()].forEach((n) => {
          const td = document.createElement("td");
          tr.appendChild(td);
        });
        tetris.prepend(tr);
      }
    });
    draw();
    generate();
    return false;
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
function nextDraw() {
  next.querySelectorAll("td").forEach((td) => {
    td.className = "";
  });
  nextBlock.shape[0].forEach((col, i) => {
    col.forEach((row, j) => {
      if (row < 10 && row !== 0) {
        next.children[i].children[j + 1].classList.add(`${nextBlock.color}`);
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
  if (!currentBlock) {
    currentBlock = block[Math.floor(Math.random() * block.length)][0];
  } else {
    currentBlock = nextBlock;
  }
  nextBlock = block[Math.floor(Math.random() * block.length)][0];
  currentPosition = [-1, 3];
  currentBlockIndex = 0;
  console.log(currentBlock);
  nextDraw();
  currentBlock.shape[0].slice(1).forEach((col, i) => {
    col.forEach((row, j) => {
      if (row) {
        if (tetrisData[i][j + 3]) {
          gameOver = true;
        }
        tetrisData[i][j + 3] = currentBlock.numCode;
      }
    });
  });
  if (gameOver) {
    alert("패배하셨습니다 ㅠㅠ");
    tetrisData = [];
    tetris.innerHTML = "";
    gameOver = false;
    init();
    generate();
  }
  draw();
}
let downBlock = setInterval(tick, 1000);
function stop() {
  clearInterval(downBlock);
}
init();
generate();

window.addEventListener("keydown", (e) => {
  const key = e.code;
  let canGo;
  switch (key) {
    case "ArrowLeft":
      canGo = checkMove(currentBlock, derection.left);
      break;
    case "ArrowRight":
      canGo = checkMove(currentBlock, derection.right);
      break;
    default:
      return;
  }
  if (canGo) {
    currentBlock.shape[currentBlockIndex].forEach((col, i) => {
      col.forEach((row, j) => {
        if (row) {
          tetrisData[currentPosition[0] + i][currentPosition[1] + j] =
            currentBlock.numCode;
        }
      });
    });
    draw();
  } else {
    return;
  }
});
window.addEventListener("keydown", (e) => {
  const key = e.code;
  let canGo;
  switch (key) {
    case "Space":
      while (tick());
      break;
    case "ArrowDown":
      tick();
      break;
    case "ArrowUp":
      const pastIndex = currentBlockIndex;
      if (currentBlock.shape[currentBlockIndex + 1]) {
        currentBlockIndex += 1;
      } else {
        currentBlockIndex = 0;
      }
      canGo = checkMove(currentBlock);
      if (canGo) {
        currentBlock.shape[currentBlockIndex].forEach((col, i) => {
          col.forEach((row, j) => {
            if (row) {
              tetrisData[currentPosition[0] + i][currentPosition[1] + j] =
                currentBlock.numCode;
            }
          });
        });
        draw();
      } else {
        currentBlockIndex = pastIndex;
      }
      break;
  }
});
document.querySelector(".stop").addEventListener("click", () => {
  if (!stopFlag) {
    stop();
    stopFlag = true;
  }
});
document.querySelector(".start").addEventListener("click", () => {
  if (stopFlag) {
    downBlock = setInterval(tick, 1000);
    stopFlag = false;
  }
});
