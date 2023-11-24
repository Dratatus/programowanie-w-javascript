const gameBoard = document.querySelector(".game_board");
let hole;
let timer = document.getElementById("timer");
let ball = document.querySelector("#ball");
let container = document.getElementsByClassName("container")[0];
let instruction = document.getElementById("instructionForm");
let btnStart = document.getElementById("start");
let score1 = document.getElementById("score");
let score = 0;
let ballX, ballY;
let speedX = 0, speedY = 0;
let posX = 1000, posY = 500;
let m = 0;
let s = -1;
let highScore = 0;
let highScore1 = document.querySelector("#highscore");
let minW = 40;
let maxW = minW + parseInt(gameBoard.offsetWidth) - 85;
let minH = 150;
let maxH = minH + parseInt(gameBoard.offsetHeight) - 85;

const maxY = gameBoard.clientWidth - ball.clientWidth;
const maxX = gameBoard.clientHeight - ball.clientHeight;

console.log(typeof (gameBoard.offsetHeight));
console.log(typeof (gameBoard.offsetWidth));

window.addEventListener("deviceorientation", moveBall)

function StartGame() {
    console.log(posX, posY, ballX, ballY);
    instruction.style.visibility = "hidden";
    ball.style.visibility = "visible";


    setInterval(() => {
        //method
    }, 1000
    )
}

btnStart.addEventListener("click", start);

function counter() {
    s++;

    if (s == 60) {
        s = 0;
        m++
    }

    if (m === 1) {
        //method 
        m = 0;
    }
    displayTime()
}

function displayTime() {
    let time;
    if (s < 10) {
        displayS = "0" + s;
    } else displayS = s;
    if (m < 10) {
        displayM = "0" + m;
    } else displayM = m
    time = displayM + ";" + displayS;
    timer.innerHTML = time;
}

function moveBall(e) {
    let x = e.beta;
    let y = e.gamma;

    if (x > 90) x = 90;
    if (x < -90) x = -90;

    x += 90;
    y += 90;

    ball.style.top = `${(maxY * y) / 180}px`;
    ball.style.top = `${(maxX * x) / 180}px`;
    checkCollision(ball, hole)
}

function PutHole() {
    hole = document.createElement("div");
    hole.classList.add("hole");
    hole.style.visibility = "visible";

    let rndW = Math.random() * (gameBoard.clientWidth - 75);
    let rndH = Math.random() * (gameBoard.clientHeight - 75);

    console.log(rndW);
    console.log(rndH);

    hole.style.left = rndW + "px";
    hole.style.top = rndH + "px";

    container.appendChild(hole);
}