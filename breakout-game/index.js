/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const BALL_RADIUS = 10;
let BALL_COLOR = "#0095DD";
let X = canvas.width / 2;
let Y = canvas.height - 30;

let dx = 2;
let dy = -2;

function getRandomColor() {
    return `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(X, Y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = BALL_COLOR;
    ctx.fill();
    ctx.closePath();
}

function resetBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    resetBall();
    drawBall();
    const NEW_X = X + dx;
    const NEW_Y = Y + dy;
    if (NEW_X < BALL_RADIUS || NEW_X > canvas.width - BALL_RADIUS) {
        dx = -dx;
        BALL_COLOR = getRandomColor();
    }
    if (NEW_Y < BALL_RADIUS || NEW_Y > canvas.height - BALL_RADIUS) {
        dy = -dy;
        BALL_COLOR = getRandomColor();
    }
    X += dx;
    Y += dy;
}

setInterval(draw, 10);