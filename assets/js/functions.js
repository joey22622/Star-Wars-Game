
// GLOBAL VARIABLES
// // CHARACTER BANK
var charBank = [
        {name : "Darth Maul", hp : 1600 , drain : 1600, baseAttack : 60 , counter : 12 , canFight: true},
        {name : "Yoda", hp : 1400 , drain: 1400, baseAttack : 40 , counter : 6, canFight: true},
        {name : "Jar Jar Binks" , hp : 5 , drain : 5 , baseAttack : 20 , counter : 1, canFight: true},
        {name : "Palpatine" , hp : 2000 , drain : 2000 , baseAttack : 40 , counter : 14, canFight: true},
        {name : "Vader" , hp : 1900 , drain : 1900 , baseAttack : 60 , counter : 22, canFight: true }
    ];

// ARRAY OF BACKGROUND IMAGES THAT ARE RANDOMLY ASSIGNED DURING GAMEPLAY
var background = [
        "assets/images/background-0.jpg",
        "assets/images/background-1.jpg",
        "assets/images/background-2.jpg",
        "assets/images/background-3.jpg",
        "assets/images/background-4.jpg"
];




var gameReady = false;
// // REMAINING BANK
var remBank;
var player;
var playerActive = false;
var attack;
var defender;
var defenderActive = false;
// // COUNTDOWN CLOCK
var clock = 3;
var level = 10;
var wins = 0;
var losses = 0;

// Messages that display during different points in the game
var messages = {
    choosePlayer : "Please select your character", 
    chooseDefender : "Please select an opponent", 
    nextRound : "Choose your next opponent"};

//Stores button text and methods that appear/run depending on "active" boolean
var buttonText = [
{ text : "Start Game", active: false, func : countDown},
{ text : "Next Round", active: false, func : nextRound},
{ text : "Start Round", active: false, func : countDown},
{ text : "Play Again" , active: false, func : gameReset}
];

//Checks which button function is set to run, runs it, then resets the button
function startButton(){
    for(var i = 0; i < buttonText.length; i++){
        if(buttonText[i].active){
          buttonText[i].func();
          buttonClear();

        }
    }

}
//Loads a random backgrop
function loadBackdrop () {
    var i = Math.floor(Math.random()*background.length);
    $(".arena").css("background-image", "url(" + background[i] + ")");
}


//sets start button to appropriate function depending on moment in the game
function buttonReady(num){
    $(".start").text(buttonText[num].text);
    $(".start").removeClass("hidden");
    buttonText[num].active = true;
}

//hides button, disables button functions
function buttonClear(){
    for(var i = 0; i < buttonText.length; i++){
        buttonText[i].active = false;
    }
    $(".start").addClass("hidden");
}

//reassigns level, preps game for next round
function nextRound (){
    defender = false;
    level++;
    buttonClear();
    defenderClear();
    $(".message").text(messages.nextRound);
    $(".char-bank").removeClass("hidden");
    $(".level").text(level);
    $(".defender-wrap .hp").css({"background" : "rgba(0,255,100,1)" , "width" : "100%"});
    $(".player-wrap .attack").text(player.baseAttack*level);
    
}

function roundReady(){
    if(level > 1){ 
        buttonReady(2);

    } else {
        buttonReady(0);
    }
    gameReady = true;

}

function imageWidth(){
    var width = $(".character img").height();
    $(".character img").css("width", width);
}

imageWidth();

//returns game to onload look (excluding wins and losses fields)
function gameReset(){
    $(".wins").text(wins);
    $(".losses").text(losses);
    $(".message").text(messages.choosePlayer);
    level = 1;
    $(".level").text(level);
    remBank = charBank;
    $(".char-bank").empty();
    $(".defender-wrap .hp").css({"background" : "rgba(0,255,100,1)" , "width" : "100%"});
    $(".player-wrap .hp").css({"background" : "rgba(0,255,100,1)" , "width" : "100%"});
    $(".player-wrap").addClass("hidden");
    $(".defender-wrap").addClass("hidden");
    player = 0;
    defender = 0;
    playerClear();
    defenderClear();
    if(wins > 0 || losses || 0){
        $(".start").addClass("hidden");
    }
    loadCharBank();
    loadBackdrop();
}

//clears player
function playerClear(){
    $(".player-wrap .image-wrap img");
    $(".player-wrap .name");
    $(".player-wrap .attack");
    $(".player-wrap .counter");

}

//clears the 'defender field' in bottom right corner of arena
function defenderClear(){
    $(".defender-wrap").addClass("hidden");
    $(".defender-wrap .image-wrap img").empty();
    $(".defender-wrap .name").empty();
    $(".defender-wrap .attack").empty();
    $(".defender-wrap .counter").empty();
}

// loads characters at start of game/between rounds
function loadCharBank(){
    $(".char-bank").empty();
    $(".char-bank").removeClass("hidden");
    for(var i = 0; i < remBank.length; i++){
        var j = i+1;
        var char = $("<div>");
        var imgWrap = $('<div class="img-wrap">');
        var img = $("<img>");
        var info = $('<div class="info">');
        var name = $('<span class ="name">');
        var hp = $('<span class ="hp">');
        var attack = $('<span class ="attack">');
        var counter = $('<span class ="counter">');
        name.text(remBank[i].name);
        hp.html("<span>HEALTH:</span>"  + "<span>" + remBank[i].hp) + "</span>";
        attack.html("<span>ATTACK:</span>" + "<span>" +   remBank[i].baseAttack) + "</span>";
        counter.html("<span>COUNTER:</span>" + "<span>" + remBank[i].counter) + "</span>";
        img.attr({"src" : "assets/images/character-"+i+".jpg"})
        char.attr({"data-character" : i , "class" : "character character-" +(i)});
        imgWrap.append(img);
        info.append(name,hp,attack,counter);
        char.append(imgWrap,info);
        $(".char-bank").append(char);
    }
}



// handles assignment of user and computer players
// determines if user has been selected, if not assigns user, if so assigns computer player
function assignChar() {
        if(player && defender == false){
            var i = $(this).attr("data-character");
            var img = $(".defender-wrap .image-wrap img");
            var name = $(".defender-wrap .name");
            var attack = $(".defender-wrap .attack");
            var counter = $(".defender-wrap .counter");
            defender = remBank[i];
            remBank[i].canFight = false;
            img.attr("src" , "assets/images/character-" + i + ".jpg");
            name.text(defender.name);
            attack.text(defender.baseAttack);
            counter.text(defender.counter);
            $(".defender-wrap attack-label").text("Attack:");
            $(".defender-wrap counter-label").text("Counter-attack:")
            $(".defender-wrap").removeClass("hidden");
            $(".character-"+i).addClass("hidden");
            roundReady();

        } else if(player == false){
            var i = $(this).attr("data-character");
            var img = $(".player-wrap .image-wrap img");
            var name = $(".player-wrap .name");
            var attack = $(".player-wrap .attack");
            var counter = $(".player-wrap .counter");
            player = remBank[i];
            remBank[i].canFight = false;
            img.attr("src" , "assets/images/character-" + i + ".jpg");
            name.text(player.name);
            attack.text(player.baseAttack);
            counter.text(player.counter);
            $(".character-"+i).addClass("hidden");
            $(".player-wrap").removeClass("hidden");
        }

}

// runs prior to start of round, basic countdown clock that appears above arena
function countDown(){
    loadBackdrop();
    if(gameReady === true){
        clock = 3;
        var x = setInterval(function(){
        clock--;
        $(".message").text(clock);

        if (clock <= 0) {
            clearInterval(x);
            playerActive = true;
            defenderActive = true;
            defenderFight();
            $(".message").text("PRESS SPACE KEY TO FIGHT!!");
            $(".char-bank").addClass("hidden");
            gameReady = false;
        }

        },1000);
    }
}

// activated by spacebar keyup, causes damage to defender each time function runs
function playerFight(){
    if(playerActive === true && defender.drain > 0){
        attack = player.baseAttack*level;
        defender.drain = defender.drain-attack-defender.counter;
        var hpGreen = (defender.drain/defender.hp)*255;
        var hpRed = 255 - ((defender.drain/defender.hp)*255);
        var hpWidth = (defender.drain/defender.hp)*100;
        $(".defender-wrap .hp").css("width" , hpWidth + "%")
        $(".defender-wrap .hp").css("background" , "rgba(" + hpRed + "," + hpGreen + ",50,1)" );


    } else if (defender.drain <= 0 && playerActive === true){
        endRound();
        winRound();
    }
}
 
// function makes the defender attack at a randomly generated interval
function defenderFight(){
    var rand = 200;
    var y = setInterval(function(){
        player.drain = player.drain-(defender.baseAttack-player.counter);
        var hpGreen = (player.drain/player.hp)*255;
        var hpRed = 255 - ((player.drain/player.hp)*255);
        var hpWidth = (player.drain/player.hp)*100;
        $(".player-wrap .hp").css("width" , hpWidth + "%");
        $(".player-wrap .hp").css("background" , "rgba(" + hpRed + "," + hpGreen + ",50,1)" );

        if(player.drain <= 0){
            clearInterval(y);
            if(playerActive){
            endRound();
            }
        } else if (defenderActive === false){
            clearInterval(y);
        }
    }, rand );
}


// loseGame, winGame tally to wins or losses depending on outcome
function loseGame(){
    losses++;
    buttonReady(3);
    $(".losses").text(losses);
}

function winGame(){
    wins++;
    buttonReady(3);
    $(".wins").text(wins);

}

//Stops battle between players, determines if User has lost the round/game
function endRound(){
    playerActive = false;
    defenderActive = false;
    if(player.drain <= 0){
        loseGame();
    }
}
function winRound(){
    defender.hp = 0;
    var beatAll = true;
    for (var i = 0; i < remBank.length; i++){
        if(remBank[i].canFight === true){
            beatAll = false;
        }
    }
    if(beatAll){
        winGame()
        beatAll = false;
    } else {
    buttonReady(1);
    }
}




//jquery events
$(document).ready(gameReset);
$("body").on("click", ".game-title", gameReset);
$("body").on("click", ".start", startButton);
$("body").on("click", ".character", assignChar);



//Runs playerFight function when clicking spacebar
document.onkeyup = function(event){
    if(event.keyCode == 32){
        $(".start").blur();
        playerFight();
    }
}