var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(level);
});

$("body").keypress(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    level++;
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    var size = userClickedPattern.length;
    if (gamePattern[size - 1] !== userClickedPattern[size - 1]) {
        userClickedPattern.length = 0;
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    } else {
        if (size === currentLevel) {
            setTimeout(nextSequence, 1000);
            userClickedPattern.length = 0;
        }
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    started = false;
}