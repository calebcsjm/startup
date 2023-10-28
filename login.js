function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    const passwordEl = document.querySelector("#password");
    localStorage.setItem("password", passwordEl.value);

    console.log(`Username: ${nameEl.value}`)
    console.log(`Password: ${passwordEl.value}`)
    
    window.location.href = "goaltracker.html";
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