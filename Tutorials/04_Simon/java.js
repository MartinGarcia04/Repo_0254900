const colors = ["red", "blue", "green", "yellow"];

let pattern = [];
let userPattern = [];

let isGameStarted = false;
let currentLevel = 0;

function generateNextSequence() {
    userPattern = [];
    currentLevel++;
    $("#level-title").text(`Level ${currentLevel}`);
    
    const randomIndex = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[randomIndex];
    pattern.push(selectedColor);
  
    $(`#${selectedColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(selectedColor);
  }
  
  function highlightPress(color) {
    $(`#${color}`).addClass("pressed");
    setTimeout(() => {
      $(`#${color}`).removeClass("pressed");
    }, 100);
  }
  
  function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.volume=0.05;
    audio.play();
  }
  
  function resetGame() {
    currentLevel = 0;
    pattern = [];
    isGameStarted = false;
  }
  

$(document).keypress(() => {
  if (!isGameStarted) {
    $("#level-title").text(`Level ${currentLevel}`);
    generateNextSequence();
    isGameStarted = true;
  }
});

$(".btn").click(function() {
  const chosenColor = $(this).attr("id");
  userPattern.push(chosenColor);

  playSound(chosenColor);
  highlightPress(chosenColor);

  validateAnswer(userPattern.length - 1);
});

function validateAnswer(currentIndex) {
  if (pattern[currentIndex] === userPattern[currentIndex]) {
    if (userPattern.length === pattern.length) {
      setTimeout(generateNextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    resetGame();
  }
}

