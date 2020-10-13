"use strict";
const tableTag = document.querySelector("table");
const bodyTag = document.querySelector("body");
const startBtn = document.querySelector('#startBtn');
let i, j, count = 0;
let dataset = [];
startBtn.addEventListener('click',()=>{
  bodyTag.innerHTML = '';
  dataset = [];
  for (i = 0; i < 3; i++) {
    const columnTag = document.createElement("column");
    bodyTag.appendChild(columnTag);
    const data = [];
    for (j = 0; j < 3; j++) {
      const divTag = document.createElement("div");
      divTag.addEventListener("click", (e) => {
        const body = e.target.parentNode.parentNode;
        const column = e.target.parentNode;
        const width = Array.prototype.indexOf.call(body.children, column) - 1;
        const height = Array.prototype.indexOf.call(column.children, divTag);
        if(dataset[width][height] === 1){
          return
        }
        e.target.innerText = 'O';
        dataset[width][height] = 1;
        count++;
        if(count === 9){
          setTimeout(()=>{
            const yesOrNo = confirm('게임이 종료되었습니다. 다시 하시겠습니까?');
            if(yesOrNo){
              console.log('hi');
            }else{
              console.log("bye");
            }
          },100)
        }
      });
      columnTag.appendChild(divTag);
      data.push(0);
    }
    dataset.push(data);
  } 
})
