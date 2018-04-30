// Health Points, Attack Power and Counter Attack Power

// GAME VARIABLES

// var gameActive = false;
// var gameReady = false;
// var charReady = false;
// var nameReady = false;

// var level = 1;
// var highScore = 0;
// var players = [
//     {playerName : "",
//     playerScores : []}
// ];


// var playerName;
// var playerChar;
// var computerChar;


// var characters = [
//     {charName : "Darth Maul", charHealth : 600 , charHit : 12 , charCounter : 6},
//     {charName : "Yoda", charHealth : 600 , charHit : 12 , charCounter : 6},
//     {charName : "Jar Jar Binks", charHealth : 10 , charHit : 1 , charCounter : 1},
//     {charName : "Darth Vader", charHealth : 600 , charHit : 12 , charCounter : 6},
//     {charName : "Han Solo", charHealth : 600 , charHit : 12 , charCounter : 6},
//     {charName : "Obi Wan Kenobi", charHealth : 600 , charHit : 12 , charCounter : 6}
// ];

// var remainingChar = [];












$(document).ready(gameReset);
$("body").on("click", ".game-title", gameReset);

$("body").on("click", ".character", assignDefender);


// PSEUDO CODE: STAR WARS GAME:

//                 1. DECLARE VARIABLES
//                 2. DEFINE KEY ACTIONS
//                 3. DEFINE WHAT HAPPENS DURING KEY ACTIONS
//                 4. DEFINE SIMILAR SECTIONS OF CODE / DEVELOP INTO FUNCTIONS

// // VARIABLES:

// // CHARACTER BANK
var charBank = [
        {name: "Darth Maul", hp : 600 , baseAttack : 12 , counter : 6 , ready : false},
        {name : "Yoda", hp : 600 , baseAttack : 12 , counter : 6, ready : false},
        {name : "Jar Jar Binks" , hp : 10 , baseAttack : 1 , counter : 1, ready : false}
];



// // REMAINING BANK
var remBank = charBank;
// // PLAYER
var player;
var playerReady = false;
// // DEFENDER
var test;

var defender;
var defenderReady = false;
// // COUNTDOWN CLOCK
var countdown = 3;
// // LEVEL
var level = 1;
// // WINS
var wins = 0;
// // LOSSES
var losses = 0;

var messages = {
    choosePlayer : "Please select your character",
    chooseDefender : "Please select an opponent",
    nextRound : "Choose your next opponent"
};

// // CHARACTER BASE ATTACK
// // CHARACTER ATTACK = CHARACTER BASE ATTACK * LEVEL
// // CHARACTER HP
// // CHARACTER COUNTER ATTACK



//     FUNCTIONS
//         LOAD START CONTENT


function loadCharBank(){
    
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
        img.attr({"src" : "assets/images/character-"+j+".jpg"})
        char.attr({"data-character" : i , "class" : "character character-" +(j)});
        imgWrap.append(img);
        info.append(name,hp,attack,counter);
        char.append(imgWrap,info);
        $(".char-bank").append(char);
    }
}

function assignPlayer() {
        var i = $(this).attr("data-character");
        var img = $(".player-wrap .image-wrap img");
        var name = $(".player-wrap .name");
        var hp = $(".player-wrap .hp");
        var attack = $(".player-wrap .attack");
        var counter = $(".player-wrap .counter");
        player = remBank[i];
        img.attr("src" , "assets/images/character-" + i + ".jpg");
        name.text(player.name);
        hp.text(player.hp);
        attack.text(player.baseAttack);
        counter.text(player.counter);
        playerReady = true;

}

function assignDefender() {
    if(playerReady === false){
        var i = $(this).attr("data-character");
        var img = $(".defender-wrap .image-wrap img");
        var name = $(".defender-wrap .name");
        var hp = $(".defender-wrap .hp");
        var attack = $(".defender-wrap .attack");
        var counter = $(".defender-wrap .counter");
        defender = remBank[i];
        img.attr("src" , "assets/images/character-" + i + ".jpg");
        name.text(defender.name);
        hp.text(defender.hp);
        attack.text(defender.baseAttack);
        counter.text(defender.counter);
        console.log(defender);
        defenderReady = true;
    } else {
    assignPlayer;
    }
    
}






function gameReset(){
    $(".wins").text(wins);
    $(".losses").text(losses);
    $(".message").text(messages.choosePlayer);
    level = 1;
    $(".level").text(level);
    img = "";
    name = "";
    hp = "";
    attack = "";
    counter = "";
    remBank = charBank;
    $(".char-bank").empty();
    loadCharBank();
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

// // ONLOAD:
// //     LOAD ARRAY OF AVAILABLE CHARACTERS WITH STATS LISTED
// //     LOAD WINS
// //     LOAD LOSSES

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


        
// // WHEN COUNTDOWN REACHES 0
//         EVERY TIME USER HITS "SPACEBAR" IF(ROUND ACTIVE)            
//             DEFENDER.HP - (USER ATTACK - COUNTER ATTACK)
//             **SPECIAL ATTACK ++
//             IF(DEFENDER.HP =< 0)
//                 DEFENDER.HP = 0;
//                 ROUND ACTIVE = FALSE;
//                 FUNCTION ROUND RESET
//                     DEFENDER'S CHARACTER REMOVED

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
//             IF(PLAYER.HP =< 0)
//                 PLAYER.HP = 0;
//                 ROUND ACTIVE = FALSE;
//                 FUNCTION END GAME
//                     LOSSES ++
//                     DEFENDER GLOATS
//                     PLAY AGAIN BUTTON APPEARS
//                         PLAY AGAIN ON CLICK (GAME RESET)
//                             REMAINING BANK = PLAYER BANK



            
            

        

    










