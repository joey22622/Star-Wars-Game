// Health Points, Attack Power and Counter Attack Power

// GAME VARIABLES




// // CHARACTER BANK
var charBank = [
        {name : "Darth Maul", hp : 1600 , drain : 1600, baseAttack : 60 , counter : 12 , canFight: true},
        {name : "Yoda", hp : 1400 , drain: 1400, baseAttack : 40 , counter : 6, canFight: true},
        {name : "Jar Jar Binks" , hp : 5 , drain : 5 , baseAttack : 20 , counter : 1, canFight: true},
        {name : "Palpatine" , hp : 2000 , drain : 2000 , baseAttack : 40 , counter : 14, canFight: true},
        {name : "Vader" , hp : 1900 , drain : 1900 , baseAttack : 60 , counter : 22, canFight: true }
    ];

var background = [
        "assets/images/background-0.jpg",
        "assets/images/background-1.jpg",
        "assets/images/background-2.jpg",
        "assets/images/background-3.jpg",
        "assets/images/background-4.jpg"
];

function loadBackdrop () {
    var i = Math.floor(Math.random()*background.length);
    $(".arena").css("background-image", "url(" + background[i] + ")");
    console.log("backdrop: " + background[i]);
}


var gameReady = false;
// // REMAINING BANK
var remBank;
// // PLAYER
var player;
var playerActive = false;
var attack;
// // DEFENDER
var defender;
var defenderActive = false;
// // COUNTDOWN CLOCK
var clock = 3;
// // LEVEL
var level = 10;
// // WINS
var wins = 0;
// // LOSSES
var losses = 0;


var messages = {
    choosePlayer : "Please select your character", 
    chooseDefender : "Please select an opponent", 
    nextRound : "Choose your next opponent"};

var buttonText = [
{ text : "Start Game", active: false, func : countDown},
{ text : "Next Round", active: false, func : nextRound},
{ text : "Start Round", active: false, func : countDown},
{ text : "Play Again" , active: false, func : gameReset}
];

function startButton(){
    for(var i = 0; i < buttonText.length; i++){
        if(buttonText[i].active){
          buttonText[i].func();
          buttonClear();

        }
    }

}

function buttonReady(num){
    $(".start").text(buttonText[num].text);
    $(".start").removeClass("hidden");
    buttonText[num].active = true;
    console.log("buttonReady" + num);
}

function buttonClear(){
    for(var i = 0; i < buttonText.length; i++){
        buttonText[i].active = false;
    }
    $(".start").addClass("hidden");
}


function nextRound (){
    defender = false;
    level++;
    buttonClear();
    $(".char-bank").removeClass("hidden");
    $(".defender-wrap .hp").css({"background" : "rgba(0,255,100,1)" , "width" : "100%"});
    $(".player-wrap .attack").text(player.baseAttack*level);
    defenderClear();
    
}
function roundReady(){
    if(level > 1){ 
        buttonReady(2);

    } else {
        buttonReady(0);
    }
    gameReady = true;

}

// // CHARACTER BASE ATTACK
// // CHARACTER ATTACK = CHARACTER BASE ATTACK * LEVEL
// // CHARACTER HP
// // CHARACTER COUNTER ATTACK



//     FUNCTIONS
//         LOAD START CONTENT

// // ONLOAD:
// //     LOAD ARRAY OF AVAILABLE CHARACTERS WITH STATS LISTED
// //     LOAD WINS
// //     LOAD LOSSES

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

function playerClear(){
    var img = $(".player-wrap .image-wrap img");
    var name = $(".player-wrap .name");
    var attack = $(".player-wrap .attack");
    var counter = $(".player-wrap .counter");
    img.empty();
    name.empty();
    attack.empty();
    counter.empty();
}
function defenderClear(){
    var img = $(".defender-wrap .image-wrap img");
    var name = $(".defender-wrap .name");
    var attack = $(".defender-wrap .attack");
    var counter = $(".defender-wrap .counter");
    img.empty();
    name.empty();
    attack.empty();
    counter.empty();


}


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
        hp.text(remBank[i].hp);
        attack.text(remBank[i].baseAttack);
        counter.text(remBank[i].counter);
        img.attr({"src" : "assets/images/character-"+i+".jpg"})
        char.attr({"data-character" : i , "class" : "character character-" +(i)});
        imgWrap.append(img);
        info.append(name,hp,attack,counter);
        char.append(imgWrap,info);
        $(".char-bank").append(char);
    }
}



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
            console.log(buttonText);

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







//         SELECT CHARACTER
//             IF(PLAYER){
//                 SET CHARACTER AS DEFENDER
//             } SET CHARACTER AS PLAYER

//         START ROUND
//             IF(LEVELS>0){
//                 START.TEXT (START ROUND)
//             }   START GAME

//         FUNCTION WIN ROUND



// 
// // BASIC ACIONS



// //     PLAYER CHOOSES THEIR CHARACTER
//             CHARACTER OBJECT BECOMES PLAYER
//             CHARACTER OBJECT REMOVED FROM PLAYERS REMAINING
// //     PLAYER CHOOSES DIFFERENT STARTING OPPONENT (DEFENDER)
//             CHARACTER OBJECT BECOMES DEFENDER
//             CHARACTER OBJECT REMOVED FROM PLAYERS REMAINING
            

// //     GAME 'START' BUTTON APPEARS / GAME COMMENCES WHEN PLAYER CLICKS

// // ON 'START' CLICK
//         PLAYER OBJECT LOADS AS PLAYER 1
//         DEFENDER OBJECT LOADS AS PLAYER 2
//         GAME COUNTDOWN CLOCK APPEARS (3 SECONDS)

function countDown(){
    loadBackdrop();
    if(gameReady === true){
        var x = setInterval(function(){
        clock--;
        $(".message").text(clock);

        if (clock <= 0) {
            clearInterval(x);
            playerActive = true;
            defenderActive = true;
            defenderFight();
            $(".message").empty("PRESS F TO FIGHT!!");
            $(".char-bank").addClass("hidden");
            gameReady = false;
        }

        },1000);
    }
}

function playerFight(){
    if(playerActive === true && defender.drain > 0){
        attack = player.baseAttack*level;
        defender.drain = defender.drain-attack-defender.counter;
        var hpGreen = (defender.drain/defender.hp)*255;
        var hpRed = 255 - ((defender.drain/defender.hp)*255);
        var hpWidth = (defender.drain/defender.hp)*100;
        $(".defender-wrap .hp").css("width" , hpWidth + "%")
        $(".defender-wrap .hp").css("background" , "rgba(" + hpRed + "," + hpGreen + ",50,1)" );
        // console.log("hp Red" + hpRed);
        // console.log("hp Green" + hpGreen);

    } else if (defender.drain <= 0){
        endRound();
        winRound();
    }
}
 
function defenderFight(){
    console.log("function is running");
    var rand = 200;
    var y = setInterval(function(){
        player.drain = player.drain-(defender.baseAttack-player.counter);
        var hpGreen = (player.drain/player.hp)*255;
        var hpRed = 255 - ((player.drain/player.hp)*255);
        var hpWidth = (player.drain/player.hp)*100;
        $(".player-wrap .hp").css("width" , hpWidth + "%");
        $(".player-wrap .hp").css("background" , "rgba(" + hpRed + "," + hpGreen + ",50,1)" );




//             IF(PLAYER.HP =< 0)
//                 PLAYER.HP = 0;
//                 ROUND ACTIVE = FALSE;
//                 FUNCTION END GAME
        if(player.drain <= 0){
            clearInterval(y);
            endRound();
            endGame();
            loseGame();
            buttonReady(3);
        } else if (defenderActive === false){
            clearInterval(y);
        }
    }, rand );
}



function loseGame(){
    endGame();
    losses++;
    $(".losses").text(losses);
}

function winGame(){
    endGame();
    wins++;
}
function endRound(){
    playerActive = false;
    defenderActive = false;
    if(player.drain <= 0){
        endGame();
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
    } else {
    buttonReady(1);
    }
}

function endGame(){
}





$(document).ready(gameReset);

$("body").on("click", ".game-title", gameReset);
$("body").on("click", ".start", startButton);
$("body").on("click", ".character", assignChar);

document.onkeyup = function(event){
    if(event.keyCode == 70){
        playerFight();
    }
}


