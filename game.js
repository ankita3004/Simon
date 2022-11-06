var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

var started=false;

var level=0;

var score=0;

function nextSequence(){
  userClickedPattern=[];
  level++;
    $("#level-title").text("Level " +level+ " Score " +score);
  var randomNumber=Math.floor(Math.random()*4);

  var randomChosenColour=buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
   animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
};

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel) {
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
       if (userClickedPattern.length === gamePattern.length){
         setTimeout(function () {
           nextSequence();
         },1000);
         score+=10;
       }
   } else {
     playSound("wrong");
     $("body").addClass("game-over");
     $("#level-title").text("Game Over, Press Any Key to Restart");

     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     startOver();
   }
};

function startOver() {
  level=0;
  score=0;
  gamePattern=[];
  started=false;
};
