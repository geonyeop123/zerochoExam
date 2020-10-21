"use strict";
const tableTag = document.querySelector("table");
const bodyTag = document.body;
let i, j, k,count = 0;
let dataset = [];
let htmlDataset = [];
let winner;
let turn = 1;
const dataValue = {
  notOpen : 0,
  user : 1,
  computer : 2,
}
function resetGame(){
  count = 0;
  i = 0;
  //칸 비우기
  htmlDataset.forEach((n)=>{
    let k = 0;
    n.forEach((j)=>{
      j.innerText = '';
      dataset[i][k] = 0;
      k++;
    })
    i++;
  });
}
// 승리 검사
function winnerCheck(width, height){
  //가로검사
  if(dataset[width][0] === turn && dataset[width][1] === turn && dataset[width][2] === turn){
    winner = turn;
  }
  //세로검사
  if(dataset[0][height] === turn && dataset[1][height] === turn && dataset[2][height] === turn){
    winner = turn;
  }
  // 대각검사
  if(dataset[0][0] === turn && dataset[1][1] === turn && dataset[2][2] === turn){
    winner = turn;
  }else if(dataset[0][2] === turn && dataset[1][1] === turn && dataset[2][0] === turn){
    winner = turn;
  }
}

// 컴퓨터 턴
function computerTurn(){
  turn = dataValue.computer;
  console.log(turn);
  setTimeout(()=>{
    if(dataset[1][1] === dataValue.notOpen){
      const center = htmlDataset[1][1];
      center.click();
    }
    turn = dataValue.user;
  },1000);
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
      const table = e.target.parentNode.parentNode;
      const tr = e.target.parentNode;
      const width = Array.prototype.indexOf.call(table.children, tr);
      const height = Array.prototype.indexOf.call(tr.children, td);
      if(dataset[width][height] !== dataValue.notOpen){
        return;
      }
      if(turn === dataValue.user){
        e.target.innerText = 'O';
      }else if(turn === dataValue.computer){
        e.target.innerText = 'X';
      }
      dataset[width][height] = dataValue[turn];
      count++;
      if(count >=5){
        winnerCheck(width,height);
        if(winner === 1){
          setTimeout(()=>{
            alert('승리하셨습니다 :)');
          resetGame();
          },100);
        }else if(winner === 2){
          setTimeout(()=>{
            alert('패배하셨습니다 :(');
          resetGame();
          },100);
        }
      }
      if(count === 9 && !winner){
        setTimeout(()=>{
          alert('무승부!');
          resetGame();
        },100)
      }
      computerTurn();
    });
    tr.appendChild(td);
    htmlData.push(td);
    data.push(0);
  }
  htmlDataset.push(htmlData);
  dataset.push(data);
} 
