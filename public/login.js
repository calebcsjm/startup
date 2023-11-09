if (localStorage.getItem("isLoggedIn")) {
    hideLoginStuff();
    showLogoutStuff();
    customGreeting();
} else {
    showLoginStuff();
    hideLogoutStuff();

}

function customGreeting() {
    const greeting = document.getElementById("greeting");
    greeting.textContent = `Welcome ${localStorage.getItem("userName")}!`;
}

function defaultGreeting() {
    const greeting = document.getElementById("greeting");
    greeting.textContent = "Welcome!";
}

function hideLoginStuff() {
    const loginForm = document.getElementById("loginInfoCollector");
    const loginInvite = document.getElementById("inviteToLogin");
    
    loginForm.style.display = "none";
    loginInvite.style.display = "none";
}

function hideLogoutStuff() {
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.style.display = "none";
}

function showLogoutStuff() {
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.style.display = "unset";
}

function showLoginStuff() {
    const loginForm = document.getElementById("loginInfoCollector");
    const loginInvite = document.getElementById("inviteToLogin");
   
    loginForm.style.display = "unset";
    loginInvite.style.direction = "unset";
}

function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    const passwordEl = document.querySelector("#password");
    localStorage.setItem("password", passwordEl.value);

    console.log(`Username: ${nameEl.value}`)
    console.log(`Password: ${passwordEl.value}`)

    // set login value to true
    localStorage.setItem("isLoggedIn", true);
    window.location.href = "goaltracker.html";
}

function logout() {
    localStorage.setItem("isLoggedIn", false);
    showLoginStuff();
    hideLogoutStuff();
    defaultGreeting();
    localStorage.clear();
}

class QuoteOfTheDay {
    quote;
    source;

    constructor () {
        this.quote = this.getQuote();
        this.source = this.getSource();

        const quoteEl = document.querySelector('#loginQuote');
        quoteEl.textContent = "\"" + this.quote + "\"";

        const sourceEl = document.querySelector('#loginQuoteSource');
        sourceEl.textContent = "- " + this.source;
    }

    getQuote() {
        // a dummy function for now, in the future this will call an API
        // return "A cool quote";
        return "Remember that if you don't prioritize your life someone else will.";
    }

    getSource() {
        // a dummy function for now, in the future this will call an API
        // return "Someone cool";
        return "Greg McKeown";
    }
}

const quote = new QuoteOfTheDay();