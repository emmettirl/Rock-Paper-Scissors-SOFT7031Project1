class User {
    constructor(userName, password) {
        this.userName = userName;
        this.userPassword = password;
    }


    saveUser() {

        let accountsInstance = getAccounts()
        accountsInstance.addAccount(this)
        accountsInstance.saveAccounts()
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
        console.log("about to parse")
        jsonData = JSON.parse(cookie);
        accountsInstance = new Accounts();

        jsonData.userList.forEach(userData => {
            const user = new User(userData.userName, userData.userPassword);
            accountsInstance.addAccount(user);
        });

        return accountsInstance

    } else {

        console.log("new instance")
        accountsInstance = new Accounts();
        // console.log(typeof (accountsInstance))
        return accountsInstance
    }
}


function registerNewUser(name, pass){
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
            const user = new User(name, pass);
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
                window.location.href = "game.html?name=${userList[i].userName}";
            } else {
                document.getElementById("userDataWarn").innerHTML = "No account exists with that username, please register before logging in";
            }
        }

    } else {
        document.getElementById("userDataWarn").innerHTML = "Please enter both a username and a password";
    }
}


//Main Script Logic


//cookie information
const cName = "RPSAccountInfo"
const expiryDays = 5

accountsInstance = getAccounts(cName)
console.log(accountsInstance)

