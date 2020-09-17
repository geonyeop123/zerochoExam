const computerTag = document.querySelector("#computer");
computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0`;
const rockBtn = document.querySelector("#rock");
const scissorsBtn = document.querySelector("#scissors");
const paperBtn = document.querySelector("#paper");
const scoreTag = document.querySelector(".score");
const matchResultTag = document.querySelector("#matchResult");
let score = 0;
const rspCoord = {
  rock: "0px",
  scissors: "310px",
  paper: "162px",
};
let coord = rspCoord.rock;

const rsp = {
  rock: 1,
  scissors: 0,
  paper: -1,
};

let computerRsp = rsp.rock;
const intervalMaker = () => {
  return setInterval(() => {
    if (coord === rspCoord.rock) {
      coord = rspCoord.scissors;
      computerRsp = rsp.scissors;
    } else if (coord === rspCoord.scissors) {
      coord = rspCoord.paper;
      computerRsp = rsp.paper;
    } else {
      coord = rspCoord.rock;
      computerRsp = rsp.rock;
    }
    computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${coord} 0`;
  }, 50);
};

let intervalId = intervalMaker();

function match(myChoice) {
  return () => {
    clearInterval(intervalId);
    const myRsp = rsp[myChoice];
    const matchResult = myRsp - computerRsp;
    if (matchResult === 1 || matchResult === -2) {
      score++;
      matchResultTag.textContent = "이겼습니다!! :)";
    } else if (matchResult === 2 || matchResult === -1) {
      score--;
      matchResultTag.textContent = "졌습니다ㅜㅜ :(";
    } else {
      matchResultTag.textContent = "비겼어요 'ㅇ'";
    }
    setTimeout(() => {
      intervalId = intervalMaker();
    }, 500);
    scoreTag.textContent = score;
  };
}

rockBtn.addEventListener("click", match("rock"));
scissorsBtn.addEventListener("click", match("scissors"));
paperBtn.addEventListener("click", match("paper"));
