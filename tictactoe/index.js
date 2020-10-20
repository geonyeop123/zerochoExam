"use strict";
const tableTag = document.querySelector("table");
const bodyTag = document.body;
let i, j, k,count = 0;
let dataset = [];
let htmlDataset = [];
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
function lineCheck(){
  
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
      e.target.innerText = 'O';
      dataset[width][height] = dataValue.user;
      count++;
      if(count === 9){
        setTimeout(()=>{
          alert('승리하셨습니다!');
          resetGame();
        },100)
      }

    });
    tr.appendChild(td);
    htmlData.push(td);
    data.push(0);
  }
  htmlDataset.push(htmlData);
  dataset.push(data);
} 
