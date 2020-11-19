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
let blockCount = 0;
let tickTimer = 800;
const direction = {
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
function checkMove(block, direction) {
  let pastPosition = [];
  currentPosition.forEach((n) => {
    pastPosition.push(n);
  });
  switch (direction) {
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
    // 움직일 수 없는가?
    col.forEach((row, j) => {
      if (
        row &&
        (!tetrisData[currentPosition[0] + i] ||
          tetrisData[currentPosition[0] + i][currentPosition[1] + j] ===
            undefined ||
          tetrisData[currentPosition[0] + i][currentPosition[1] + j] >= 10)
      ) {
        canGo = false;
      }
    });
  });
  if (canGo) {
    // 움직이기 전 데이터를 지운다.
    for (
      let i = tetrisData[pastPosition[0]] // position상 데이터가 존재하지 않는 경우 맨 윗줄을 지운다.
        ? pastPosition[0]
        : pastPosition[0] + 1;
      i < pastPosition[0] + currentBlock.shape[0].length;
      i++
    ) {
      for (
        let j = pastPosition[1];
        j < pastPosition[1] + currentBlock.shape[0].length;
        j++
      ) {
        if (tetrisData[i] && tetrisData[i][j] < 10) {
          tetrisData[i][j] = 0;
        }
      }
    }
  }
  if (!canGo) {
    // 움직일 수 없는 경우 현재 변경해 둔 포지션을 되돌린다.
    switch (direction) {
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
  // 한칸 아래로
  let canGo = checkMove(currentBlock, direction.down);
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
    // 블록을 멈춘다
    currentBlock.shape[currentBlockIndex].forEach((col, i) => {
      col.forEach((row, j) => {
        if (row) {
          tetrisData[currentPosition[0] + i][currentPosition[1] + j] *= 10;
        }
      });
    });
    tetrisData.forEach((col, i) => {
      // 완성된 줄이 있는가?
      let count = 0;
      col.forEach((row, j) => {
        if (row === 0) {
          count++;
        }
      });
      if (count === 0) {
        // 한 줄이 다 찼을 경우
        blockCount++;
        const column = [...Array(10).keys()].fill(0);
        tetrisData.splice(i, 1);
        tetrisData.unshift(column);
        tetris.removeChild(tetris.children[i]);
        const tr = document.createElement("tr");
        [...Array(10).keys()].forEach((n) => {
          const td = document.createElement("td");
          tr.appendChild(td);
        });
        tetris.prepend(tr);
        if (blockCount % 5 === 0) {
          clearInterval(downBlock);
          tickTimer = Math.ceil((tickTimer / 11) * 10);
          downBlock = setInterval(tick, tickTimer);
        }
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
    tickTimer = 800;
    blockCount = 0;
    init();
    generate();
  }
  draw();
}
function stop() {
  clearInterval(downBlock);
}
init();
generate();
let downBlock = setInterval(tick, tickTimer);

window.addEventListener("keydown", (e) => {
  if (stopFlag) return;
  const key = e.code;
  let canGo;
  switch (key) {
    case "ArrowLeft":
      canGo = checkMove(currentBlock, direction.left);
      break;
    case "ArrowRight":
      canGo = checkMove(currentBlock, direction.right);
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
  if (stopFlag) return;
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
