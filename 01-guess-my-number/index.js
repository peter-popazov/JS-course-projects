"use strict";

const MAX_SCORE = 30;

let range;
let secretNumber;
let highScore = 0;
let score = MAX_SCORE;

document.querySelector(".go").addEventListener("click", function () {
  range = Number(document.querySelector(".input-range").value);
  if (range == "") {
    displayMessage("Enter a number for the range to continue");
    return;
  }
  secretNumber = Math.floor(Math.random() * range) + 1;
  document.querySelector("body").style.backgroundColor = "#222";
  displayMessage("Start guessing...");
  resetDefaults();
  document.querySelector(".highscore").textContent = 0;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  score = MAX_SCORE;
  document.querySelector(".score").textContent = MAX_SCORE;
});

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) {
    displayMessage("Enter a number first to check it");
  } else if (guess === secretNumber) {
    displayMessage("Congratulations! You`ve guessed it correctly!");
    document.querySelector(".number").textContent = guess;
    changeWinBackgr();
    updateHighScore();
  } else if (guess !== secretNumber) {
    displayMessage(
      guess > secretNumber
        ? "The secret number is smaller!"
        : "The secret number is higher!"
    );
    decreaseScore();
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = MAX_SCORE;
  document.querySelector(".score").textContent = MAX_SCORE;
  secretNumber = Math.floor(Math.random() * range) + 1;
  document.querySelector(".number").textContent = "?";
  displayMessage("Start guessing...");
  document.querySelector(".guess").value = "";
  resetDefaults();
});

const displayMessage = (message) =>
  (document.querySelector(".message").textContent = message);

function decreaseScore() {
  if (score > 0) {
    score--;
    document.querySelector(".score").textContent = score;
  } else if (score === 0) {
    console.log("sdfsad");
  }
}

function changeWinBackgr() {
  document.querySelector("body").classList.toggle("win-body");
  document.querySelector(".number").classList.toggle("win-number");
}

function updateHighScore() {
  if (score > highScore) highScore = score;
  document.querySelector(".highscore").textContent = highScore;
}

function resetDefaults() {
  document.querySelector("body").classList.remove("win-body");
  document.querySelector(".number").classList.remove("win-number");
}
