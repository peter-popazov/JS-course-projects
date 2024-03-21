const buttonColours = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];
let gamePattern;

let gameStarted;
let level;

// Initialize the game
const init = function () {
  gameStarted = false;
  level = 0;
  gamePattern = [];
};

init();

// Start the game
$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

// Get user input
$(".btn").click(function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Generate new sequence
const nextSequence = function () {
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];

  const randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
};

// Play sound
const playSound = function (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// Animate button press
const animatePress = function (currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

// Check user answer
const checkAnswer = function (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    init();
  }
};