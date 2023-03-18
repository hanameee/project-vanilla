/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const BALL_RADIUS = 10;
let BALL_COLOR = "#0095DD";
let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 75;
let paddleX = (canvas.width - PADDLE_WIDTH) / 2;

function getRandomColor() {
    return `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = BALL_COLOR;
    ctx.fill();
    ctx.closePath();
}

function resetBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    resetBall();
    drawBall();
    drawPaddle();
    const NEW_X = x + dx;
    const NEW_Y = y + dy;
    if (NEW_X < BALL_RADIUS || NEW_X > canvas.width - BALL_RADIUS) {
        dx = -dx;
        BALL_COLOR = getRandomColor();
    }
    if (NEW_Y < BALL_RADIUS || NEW_Y > canvas.height - BALL_RADIUS) {
        dy = -dy;
        BALL_COLOR = getRandomColor();
    }
    x += dx;
    y += dy;
}

setInterval(draw, 10);