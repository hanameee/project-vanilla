/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let TIMEOUT = 10;

const BALL_RADIUS = 10;
let BALL_COLOR = "#0095DD";
let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 75;
let paddleX = (canvas.width - PADDLE_WIDTH) / 2;

let keyboardDirection = "";

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
    ctx.fill();
    ctx.closePath();
}

function draw() {
    resetBall();
    drawBall();
    drawPaddle();

    const newX = x + dx;
    const newY = y + dy;

    // detect if ball hit the wall
    if (newX < BALL_RADIUS || newX > canvas.width - BALL_RADIUS) {
        dx = -dx;
        BALL_COLOR = getRandomColor();
    }
    if (newY < BALL_RADIUS) {
        dy = -dy;
        BALL_COLOR = getRandomColor();
        // ball hit the bottom
    } else if (newY > canvas.height - BALL_RADIUS) {
        // ball hit the paddle
        if (x > paddleX && x < paddleX + PADDLE_WIDTH) {
            dy = -dy;
            clearInterval(interval);
            TIMEOUT = Math.max(1, TIMEOUT - 1);
            interval = setInterval(draw, TIMEOUT);
            // otherwise
        } else {
            alert("GAME OVER!😉");
            document.location.reload();
            clearInterval(interval);
        }
    }

    // move the ball
    x += dx;
    y += dy;

    // make sure paddle is kept inside canvas
    if (keyboardDirection === "right") {
        paddleX = Math.min(paddleX + 7, canvas.width - PADDLE_WIDTH);
    }
    if (keyboardDirection === "left") {
        paddleX = Math.max(paddleX - 7, 0);
    }
}


function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        keyboardDirection = "right";
        return;
    }
    if (e.key === "Left" || e.key === "ArrowLeft") {
        keyboardDirection = "left";
        return;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        keyboardDirection = keyboardDirection === "right" && "";
        return;
    }
    if (e.key === "Left" || e.key === "ArrowLeft") {
        keyboardDirection = keyboardDirection === "left" && "";
        return;
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let interval = setInterval(draw, TIMEOUT);
