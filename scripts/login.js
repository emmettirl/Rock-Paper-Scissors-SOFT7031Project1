


class User {
    constructor(userName, password) {
        this.userName = userName;
        this.userPassword = password;
    }

    saveUser() {
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

function registerNewUser(name, pass){

    for (let i = 0; i<accountsInstance.userList.length; i++) {
        if (accountsInstance.userList[i].userName===name){
            return null;
        }
    }
    const user= new User(name, pass);
    return user.saveUser();

}

function loginExistingUser(name, pass) {
    for (let i = 0; i<accountsInstance.userList.length; i++) {
        if (accountsInstance.userList[i].userName===name && accountsInstance.userList[i].userPassword===pass){
            console.log(User)
            return User;
        }
    }
    return null

}


//Main Script Logic


//cookie information
const cName = "RPSAccountInfo"
const expiryDays = 5

cookie = getCookie(cName)
console.log(cookie.toString())

if (cookie != "") {
    console.log("about to parse")
    accountsInstance = JSON.parse(cookie);
} else {

    console.log("new instance")
    accountsInstance = new Accounts();
}