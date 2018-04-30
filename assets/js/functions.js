// Health Points, Attack Power and Counter Attack Power

// GAME VARIABLES




// // CHARACTER BANK
var charBank = [
        {name : "Darth Maul", hp : 600 , drain : 600, baseAttack : 12 , counter : 6 , canFight: true},
        {name : "Yoda", hp : 600 , drain: 600, baseAttack : 12 , counter : 6, canFight: true},
        {name : "Jar Jar Binks" , hp : 500 , drain : 500 , baseAttack : 11 , counter : 1, canFight: true},
        {name : "Jar Jar Binks" , hp : 500 , drain : 500 , baseAttack : 11 , counter : 1, canFight: true},
        {name : "Jar Jar Binks" , hp : 500 , drain : 500 , baseAttack : 11 , counter : 1, canFight: true }
    ];

var background = [
        "assets/images/background-0.jpg",
        "assets/images/background-1.jpg",
        "assets/images/background-2.jpg",
        "assets/images/background-3.jpg",
        "assets/images/background-4.jpg"

];


var gameActive = false;
var gameReady = false;
// // REMAINING BANK
var remBank;
// // PLAYER
var player;
var playerActive = false;
// // DEFENDER
var defender;
var defenderActive = false;
// // COUNTDOWN CLOCK
var clock = 4;
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

var buttonText = {
    startGame: "Start Game",
    startRound: "Start Round",
    playAgain: "Play Again"};

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
    player = 0;
    defender = 0;
    gameActive = false;
    loadCharBank();
    loadBackdrop();
}


function loadCharBank(){
    $(".char-bank").empty();
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
            remBank = remBank.splice(i , 1);
            img.attr("src" , "assets/images/character-" + i + ".jpg");
            name.text(defender.name);
            attack.text(defender.baseAttack);
            counter.text(defender.counter);
            remBank.splice(i, 1);
            $(".defender-wrap attack-label").text("Attack:");
            $(".defender-wrap counter-label").text("Counter-attack:")
            $(".character-"+i).addClass("hidden");
            if(level > 1){
            $(".start").css("opacity", "1");
            $(".start").text("Start Round");
            } else {
                $(".start").text("Start Game");
                gameReady = true;
            }
        } else if(player == false){
            var i = $(this).attr("data-character");
            var img = $(".player-wrap .image-wrap img");
            var name = $(".player-wrap .name");
            var attack = $(".player-wrap .attack");
            var counter = $(".player-wrap .counter");
            player = remBank[i];
            img.attr("src" , "assets/images/character-" + i + ".jpg");
            name.text(player.name);
            attack.text(player.baseAttack);
            counter.text(player.counter);
            remBank.splice(i, 1);
            $(".character-"+i).addClass("hidden");
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
    if(gameReady === true){
        var x = setInterval(function(){
        clock--;
        $(".message").text(clock);

        if (clock <= 0) {
            clearInterval(x);
            playerActive = true;
            defenderActive = true;
            defenderFight();
            $(".message").empty();
            $(".char-bank").addClass("hidden");
            gameReady = false;
        }

        },10);
    }
}

function playerFight(){
    if(playerActive === true && defender.drain > 0){
        var attack = player.baseAttack*level;
        defender.drain = defender.drain-attack-defender.counter;
        var hpGreen = (defender.drain/defender.hp)*255;
        var hpRed = 255 - ((defender.drain/defender.hp)*255);
        var hpWidth = (defender.drain/defender.hp)*100;
        $(".defender-wrap .hp").css("width" , hpWidth + "%")
        $(".defender-wrap .hp").css("background" , "rgba(" + hpRed + "," + hpGreen + ",50,1)" );
        // console.log("hp Red" + hpRed);
        // console.log("hp Green" + hpGreen);

    } else{
        endRound();
        winRound();
        console.log("defenderActive" + defenderActive);
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
        } else if(defenderActive === false){
            clearInterval(y);
        }
    }, rand );
}

function loadBackdrop () {
    var i = Math.floor(Math.random)*background.length;
    $(".background").attr("src", background[i]);
    console.log("backdrop: " + background[i]);
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
}
function winRound(){
    defender.hp = 0;
}

function endGame(){
    gameActive = false;
}

        
// // WHEN COUNTDOWN REACHES 0
//         EVERY TIME USER HITS "SPACEBAR" IF(ROUND ACTIVE)            
//             DEFENDER.HP - (USER ATTACK - COUNTER ATTACK)
//             **SPECIAL ATTACK ++
//
        //IF(DEFENDER.HP =< 0)
        //           DEFENDER.HP = 0;
        //           ROUND ACTIVE = FALSE;
        //           FUNCTION ROUND RESET
        //           DEFENDER'S CHARACTER REMOVED



//                     // ON 'NEXT ROUND' CLICK
//                         LEVEL ++
//                         REMAINING BANK LOADS
//                         ALERT : SELECT NEW DEFENDER
//                         IF(DEFENDER SELECTED)
//                             START BUTTON APPEARS
                            



        
//         WHILE (ROUND ACTIVE)
//             DEFENDER WAITS RANDOM TIME (.1 : .8 SECONDS)
//             PLAYER.HP - ( COMPUTER ATTACK - COUNTER ATTACK)
//             **SPECIAL ATTACK++

//                     LOSSES ++
//                     DEFENDER GLOATS
//                     PLAY AGAIN BUTTON APPEARS
//                         PLAY AGAIN ON CLICK (GAME RESET)
//                             REMAINING BANK = PLAYER BANK



            
            

        

    







$(document).ready(gameReset);

$("body").on("click", ".game-title", gameReset);
$("body").on("click", ".start", countDown);
$("body").on("click", ".character", assignChar);

document.onkeyup = function(event){
    if(event.keyCode == 32){
        playerFight();
    }
}


