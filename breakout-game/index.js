/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let score = 0;

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

const brickRowCount = 3;
const brickColumnCount = 5;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 30;
const BRICK_OFFSET_LEFT = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, isAvailable: true };
    }
}

function getRandomColor() {
    return `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = BALL_COLOR;
    ctx.fill();
    ctx.closePath();
}

function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r];
            if (currentBrick.isAvailable) {
                const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
                const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
                currentBrick.x = brickX;
                currentBrick.y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r];
            if (currentBrick.isAvailable) {
                if (x > currentBrick.x && x < currentBrick.x + BRICK_WIDTH && y > currentBrick.y && y < currentBrick.y + BRICK_HEIGHT) {
                    dy = -dy;
                    BALL_COLOR = getRandomColor();
                    currentBrick.isAvailable = false;
                    score++;
                }
            }
        }
    }
}

function winDetection() {
    if (score === brickRowCount * brickColumnCount) {
        alert("YOU WIN, CONGRATULATIONS! 🥳");
        document.location.reload();
        clearInterval(interval);
    }
}

function draw() {
    reset();
    winDetection();
    drawScore();
    collisionDetection();
    drawBall();
    drawPaddle();
    drawBricks();
    const newX = x + dx;
    const newY = y + dy;
    // detect if ball hit the wall
    if (newX < BALL_RADIUS || newX > canvas.width - BALL_RADIUS) {
        dx = -dx;
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
            TIMEOUT = Math.max(1, TIMEOUT - 0.2);
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

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > PADDLE_WIDTH / 2 && relativeX < canvas.width - PADDLE_WIDTH / 2) {
        paddleX = relativeX - PADDLE_WIDTH / 2;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

let interval = setInterval(draw, TIMEOUT);
