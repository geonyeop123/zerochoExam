const computerTag = document.querySelector("#computer");
computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0`;
const rockBtn = document.querySelector("#rock");
const scissorsBtn = document.querySelector("#scissors");
const paperBtn = document.querySelector("#paper");

const rspCoord = {
  rock: "0px",
  scissors: "310px",
  paper: "162px",
};

let coord = rspCoord.rock;
setInterval(() => {
  if (coord === rspCoord.rock) {
    coord = rspCoord.scissors;
  } else if (coord === rspCoord.scissors) {
    coord = rspCoord.paper;
  } else {
    coord = rspCoord.rock;
  }

  computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${coord} 0`;
}, 500);

rockBtn.addEventListener("click", () => {});
