// // alert("working");



let buttonColors=["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let level=0;
let count=0;

$(document).keydown(function(event){
    // $("h1").text("level 0");
    count++;
    if(count===1){
        $("h1").text("Level "+level);
        nextSequence();
    }
});

 
$("div[type='button']").on("click",function(){
    let userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }else{
        let wrong="wrong";
        playSound(wrong);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game over: Press any Key to Restart")
        console.log("wrong");
        startOver();
    }
}




function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);

    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
        let audio=new Audio("sounds/"+name+".mp3");
         audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed",100);
    });
}

function startOver(){
    level=0;
    gamePattern=[];
    count=0;
}



