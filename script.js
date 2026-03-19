// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);
}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop";

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}


let score = 0;
let timeLeft = 30;
let gameInterval;
let dropInterval;
let gameActive = false;

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const gameContainer = document.getElementById("game-container");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const messageEl = document.getElementById("game-message");
const confettiContainer = document.getElementById("confetti-container");

// START GAME
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

function startGame() {
    if (gameActive) return;

    gameActive = true;
    messageEl.textContent = "";
    score = 0;
    timeLeft = 30;
    updateUI();

    gameInterval = setInterval(updateTimer, 1000);
    dropInterval = setInterval(createDrop, 800);
}

// TIMER
function updateTimer() {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

// CREATE DROPS
function createDrop() {
    if (!gameActive) return;

    const drop = document.createElement("div");
    drop.classList.add("water-drop");

    // Random bad drop
    if (Math.random() < 0.3) {
        drop.classList.add("bad-drop");
    }

    // Random horizontal position
    drop.style.left = Math.random() * 740 + "px";

    // Random fall speed
    drop.style.animationDuration = (Math.random() * 2 + 2) + "s";

    // CLICK EVENT
    drop.addEventListener("click", () => {
        if (!gameActive) return;

        if (drop.classList.contains("bad-drop")) {
            score--;
        } else {
            score++;
        }

        updateUI();
        drop.remove();

        checkWin();
    });

    gameContainer.appendChild(drop);

    // Remove after falling
    setTimeout(() => {
        drop.remove();
    }, 4000);
}

// UPDATE UI
function updateUI() {
    scoreEl.textContent = score;
}

// END GAME
function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(dropInterval);

    messageEl.textContent = "Game Over! Final Score: " + score;
}

// RESET GAME
function resetGame() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(dropInterval);

    score = 0;
    timeLeft = 30;
    updateUI();
    timeEl.textContent = timeLeft;

    messageEl.textContent = "";

    // Remove all drops
    gameContainer.innerHTML = "";

    // Remove confetti
    confettiContainer.innerHTML = "";
}

// WIN CONDITION + CONFETTI
function checkWin() {
    if (score >= 20) {
        messageEl.textContent = "You Win! 🎉";
        createConfetti();
        endGame();
    }
}

// CONFETTI FUNCTION
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.backgroundColor = getRandomColor();

        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

// RANDOM COLORS
function getRandomColor() {
    const colors = ["#FFC907", "#2E9DF7", "#4FCB53", "#FF902A"];
    return colors[Math.floor(Math.random() * colors.length)];
}