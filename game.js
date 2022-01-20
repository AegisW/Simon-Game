var gameStarted = false;
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequenct() {
  level += 1;
  $("#level-title").html("Level " + level);

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

function playSound(name) {
  var soundPath = "sounds/" + name + ".mp3";
  var sound = new Audio(soundPath);
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    // console.log("success");

    if (index === gamePattern.length - 1) {
      setTimeout(function() {
        nextSequenct();
      }, 1000);
    }

  } else {
    // console.log("fail");
    playSound("wrong");

    var highestLevel = level - 1;
    $("#level-title").html("Game Over. Highest Level: " + highestLevel + " Click Blank Space to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  gamePattern = [];
  gameStarted = false;
  level = 0;
}

$("body").click(event => {
  if (gameStarted === false) {
    gameStarted = true;
    $("#level-title").html("Level " + level);

    setTimeout(function() {
      nextSequenct();
    }, 100);
  }

  console.log(gameStarted);
});

$(".btn").click(event => {
  event.stopPropagation();
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// $(document).keypress(event => {
//   console.log(gameStarted);
//   if (gameStarted === false) {
//     gameStarted = true;
//     $("#level-title").html("Level " + level);
//
//     setTimeout(function() {
//       nextSequenct();
//     }, 100);
//   }
//   // console.log(gameStarted);
// });
