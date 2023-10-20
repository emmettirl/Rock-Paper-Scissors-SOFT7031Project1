/* Todo:

use same cookie as rps.js to track scores


activearray = readCookie()

if winCheck == 1:
    increment playerWinCount
else if winCheck ==2:
    increment computerWinCount

write scores
write cookie

 */


class User {
    constructor(userName, password, playerScore, computerScore) {
        this.userName = userName;
        this.userPassword = password;
        this.playerScore = playerScore;
        this.computerScore = computerScore;

    }


    saveUser() {

        let accountsInstance = getAccounts()
        accountsInstance.addAccount(this)
        accountsInstance.saveAccounts()
    }

    updateUser(){
        let accountsInstance = getAccounts();
        accountsInstance.updateAccount(activeUser);
        accountsInstance.saveAccounts();
    }
}


class Accounts {
    constructor() {
        this.userList = [];
    };


    addAccount(account) {
        this.userList.push(account)
    }


    saveAccounts() {
        let cValue = JSON.stringify(this)
        setCookie(cName, cValue, expiryDays)
    }

    updateAccount(replacementUserObject) {
        const userIndex = this.userList.findIndex(user => user.userName === replacementUserObject.userName);
        if (userIndex !== -1) {
            this.userList[userIndex] = replacementUserObject;
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function getAccounts() {
    let cookie = getCookie(cName)
    let jsonData;
    let accountsInstance;

    if (cookie !== "") {
        jsonData = JSON.parse(cookie);
        accountsInstance = new Accounts();

        jsonData.userList.forEach(userData => {
            const user = new User(userData.userName, userData.userPassword, userData.playerScore, userData.computerScore);
            accountsInstance.addAccount(user);
        });

        return accountsInstance

    } else {

        accountsInstance = new Accounts();
        return accountsInstance
    }
}


function getActiveUserFromURL() {
    const searchParams = new URLSearchParams(window.location.search);

    let accountInstance = getAccounts();
    let activeUserName = searchParams.get("name")
    let ActiveUserObject;

    accountInstance.userList.forEach(user => {
        if (activeUserName === user.userName){
            ActiveUserObject = user
        }
    });

    return ActiveUserObject
}


function registerNewUser(name, pass){
    let accountsInstance = getAccounts();


    if (name !== "" && pass !== "") {
        let accountExists = 0;
        for (let i = 0; i < accountsInstance.userList.length; i++) {
            if (accountsInstance.userList[i].userName === name) {
                document.getElementById("userDataWarn").innerHTML = "user already exists, try logging in or use a different username";
                accountExists = 1;
                break;
            }
        }
        if (accountExists === 0) {
            const user = new User(name, pass, 0, 0);
            document.getElementById("userDataWarn").innerHTML = "User Registered, please Log in";
            user.saveUser();
        }
    } else {
        document.getElementById("userDataWarn").innerHTML = "Please enter both a username and a password";
    }
}


function loginExistingUser(name, pass) {
    if (name !== "" && pass !== "") {
        let accountsInstance = getAccounts()
        for (let i = 0; i < accountsInstance.userList.length; i++) {
            if (accountsInstance.userList[i].userName === name && accountsInstance.userList[i].userPassword === pass) {
                window.location.href = `game.html?name=${accountsInstance.userList[i].userName}`;
            } else {
                document.getElementById("userDataWarn").innerHTML = "No account exists with that username, please register before logging in";
            }
        }

    } else {
        document.getElementById("userDataWarn").innerHTML = "Please enter both a username and a password";
    }
}


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


function letter0Upper(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function runGame(player1Choice){

    let player2Choice = getComputerChoice();

    let result = rockPaperScissors(player1Choice, player2Choice);
    console.log(player2Choice)
    document.getElementById("playerResult").innerHTML = letter0Upper(player1Choice);
    document.getElementById("computerResult").innerHTML = letter0Upper(player2Choice);
    switch (result) {
        case 0:
            document.getElementById("endresult").innerHTML="It's a tie!";
            break;
        case 1:
            document.getElementById("endresult").innerHTML="You Win!";
            activeUser.playerScore ++;
            activeUser.updateUser()
            break;
        case 2:
            document.getElementById("endresult").innerHTML="You Lose!";
            activeUser.computerScore ++;
            activeUser.updateUser()
            break;
    }
    document.getElementById("playerScore").innerHTML = activeUser.playerScore;
    document.getElementById("computerScore").innerHTML = activeUser.computerScore;
}



function endsWithSubstring(inputString, substring) {
    const pattern = new RegExp(`${substring}$`);
    return pattern.test(inputString);
}


//Main Script Logic
const cName = "RockPaperScissors";
const expiryDays = 5;

const activeUser = getActiveUserFromURL();

if(endsWithSubstring(window.location.pathname, "game.html")){
    if (activeUser.userName === null) {
        window.location.href = "index.html";
    }
    window.onload = function(){
        document.getElementById("playerScore").innerText= activeUser.playerScore
        document.getElementById("computerScore").innerText= activeUser.computerScore
    };
}


