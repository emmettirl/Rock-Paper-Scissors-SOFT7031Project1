/* Todo:

use same cookie as login.js to track scores



HTML write playerChoice
HTML write computerChoice
HTML write result

activearray = readCookie()

if winCheck == 1:
    increment playerWinCount
else if winCheck ==2:
    increment computerWinCount

write scores
write cookie

 */


function rockPaperScissors(player1Choice, player2Choice){
    let winner;

    if (player1Choice === player2Choice) {
        winner = 0;
    }
    else if (
        (player1Choice === "rock" && player2Choice === "scissors")
        || (player1Choice === "paper" && player2Choice === "rock")
        || (player1Choice === "scissors" && player2Choice === "paper")
    ){
        winner = 1;
    }
    else {
        winner = 2;
    }

    return winner
}

function getComputerChoice(){
    let min = 0;
    let max = 3;
    let randInt = Math.floor(Math.random() * (max - min) + min);

    let choice;
    switch (randInt) {
        case 0: choice = "rock"; break;
        case 1: choice = "paper";  break;
        case 2: choice = "scissors";  break;
    }
    return choice
}


//main logic

player2 = getComputerChoice()

result = rockPaperScissors("rock", player2);
console.log(player2)
switch (result) {
    case 0: console.log("tie"); break;
    case 1: console.log("player win"); break;
    case 2: console.log("computer win"); break;
}