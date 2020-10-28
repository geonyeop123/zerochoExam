"use strict";
const tableTag = document.querySelector("table");
const bodyTag = document.body;
let i,
  j,
  k,
  count = 0;
let dataset = [];
let htmlDataset = [];
let winner;
let turn = 1;
const dataValue = {
  notOpen: 0,
  user: 1,
  computer: 2,
};
function resetGame() {
  count = 0;
  i = 0;
  winner = "";
  turn = 1;
  //칸 비우기
  htmlDataset.forEach((n) => {
    let k = 0;
    n.forEach((j) => {
      j.innerText = "";
      dataset[i][k] = 0;
      k++;
    });
    i++;
  });
}
// 승리 검사
function winnerCheck(width, height) {
  //가로검사
  if (
    dataset[width][0] === turn &&
    dataset[width][1] === turn &&
    dataset[width][2] === turn
  ) {
    winner = turn;
    console.log(winner);
  }
  //세로검사
  if (
    dataset[0][height] === turn &&
    dataset[1][height] === turn &&
    dataset[2][height] === turn
  ) {
    winner = turn;
  }
  // 대각검사
  if (
    dataset[0][0] === turn &&
    dataset[1][1] === turn &&
    dataset[2][2] === turn
  ) {
    winner = turn;
  } else if (
    dataset[0][2] === turn &&
    dataset[1][1] === turn &&
    dataset[2][0] === turn
  ) {
    winner = turn;
  }
  if (winner === 1) {
    setTimeout(() => {
      alert("승리하셨습니다 :)");
      resetGame();
    }, 100);
  } else if (winner === 2) {
    setTimeout(() => {
      alert("패배하셨습니다 :(");
      resetGame();
    }, 100);
  }
  if (turn === dataValue.user) {
    turn = dataValue.computer;
  } else if (turn === dataValue.computer) {
    turn = dataValue.user;
  }
  console.log(turn);
}

// 컴퓨터 클릭
function computerClick(width, height) {
  dataset[width][height] = dataValue.computer;
  htmlDataset[width][height].innerText = "X";
  winnerCheck(width, height);
  count++;
}

// 컴퓨터 턴
function computerTurn(userWidth, userHeight) {
  let width, height;
  if (dataset[1][1] === dataValue.notOpen) {
    width = 1;
    height = 1;
    setTimeout(() => {
      computerClick(width, height);
    }, 1000);
  } else {
    width = Math.floor(Math.random() * 3);
    height = Math.floor(Math.random() * 3);
    if (dataset[width][height] !== dataValue.notOpen) {
      computerTurn();
    } else {
      setTimeout(() => {
        computerClick(width, height);
      }, 1000);
    }
  }
  // defence(userWidth,userHeight);
}

// htmlDataset과 dataset을 만드는 과정 및 게임판 그리기
for (i = 0; i < 3; i++) {
  const tr = document.createElement("tr");
  tableTag.appendChild(tr);
  const htmlData = [];
  const data = [];
  for (j = 0; j < 3; j++) {
    const td = document.createElement("td");
    td.addEventListener("click", (e) => {
      if (turn === 2) {
        return;
      }
      const table = e.target.parentNode.parentNode;
      const tr = e.target.parentNode;
      const width = Array.prototype.indexOf.call(table.children, tr);
      const height = Array.prototype.indexOf.call(tr.children, td);
      if (dataset[width][height] !== dataValue.notOpen) {
        return;
      }
      e.target.innerText = "O";
      dataset[width][height] = turn;
      count++;
      winnerCheck(width, height);
      if (count === 9 && !winner) {
        setTimeout(() => {
          alert("무승부!");
          resetGame();
        }, 100);
      }
      turn = dataValue.computer;
      if (!winner && count < 9) {
        computerTurn(width, height);
      }
    });
    tr.appendChild(td);
    htmlData.push(td);
    data.push(0);
  }
  htmlDataset.push(htmlData);
  dataset.push(data);
}

// function defence(userWidth, userHeight){
//   let checkLine = [];
//   let computerCount = 0, userCount = 0;
//   //가로검사
//   checkLine = [dataset[userWidth][0],dataset[userWidth][1],dataset[userWidth][2]]
//   checkLine.forEach((n)=>{
//     if(n === 1){
//       userCount++;
//     }else if(n === 2){
//       computerCount++;
//     }else{
//       height = n;
//     }
//     if(userCount === 2 || computerCount === 0){
//       width = userWidth;
//       return;
//     }
//   });
//   //세로검사
//   checkLine = [dataset[0][userHeight],dataset[1][userHeight],dataset[2][userHeight]]
//   checkLine.forEach((n)=>{
//     if(n === 1){
//       userCount++;
//     }else if(n === 2){
//       computerCount++;
//     }else{
//       width = n;
//     }
//     if(userCount === 2 || computerCount === 0){
//       height = userheight;
//       return;
//     }
//   });
//   //좌대각 검사
//   checkLine = [dataset[0][0],dataset[1][1],dataset[2][2]]
//   checkLine.forEach((n)=>{
//     if(n === 1){
//       userCount++;
//     }else if(n === 2){
//       computerCount++;
//     }else{
//       width = n;
//       height = n;
//     }
//     if(userCount === 2 || computerCount === 0){
//       return;
//     }
//   });
//   //우대각검사
//   checkLine = [dataset[0][2],dataset[1][1],dataset[2][0]]
//   checkLine.forEach((n)=>{
//     if(n === 1){
//       userCount++;
//     }else if(n === 2){
//       computerCount++;
//     }else{
//       console.log(checkLine.indexOf(n));
//     }
//     if(userCount === 2 || computerCount === 0){
//       height = userheight;
//       return;
//     }
//   });
//   console.log(checkLine,computerCount,userCount);
// }
