(async () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      document.querySelector('#userName').textContent = userName;
      setDisplay('loginControls', 'none');
      setDisplay('habitControls', 'block');
    } else {
      setDisplay('loginControls', 'block');
      setDisplay('habitControls', 'none');
    }
  })();
  
  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }
  
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }
  
  async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#userName')?.value;
    const password = document.querySelector('#userPassword')?.value;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ username: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      localStorage.setItem('userName', userName);
      window.location.href = 'goaltracker.html';
    } else {
      const body = await response.json();
      const modalEl = document.querySelector('#msgModal');
      modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
      const msgModal = new bootstrap.Modal(modalEl, {});
      msgModal.show();
    }
  }
  
  function trackHabit() {
    window.location.href = 'goaltracker.html';
  }
  
  function logout() {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
  }
  
  async function getUser(username) {
    // See if we have a user with the given username.
    const response = await fetch(`/api/user/${username}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
  }
  
  function setDisplay(controlId, display) {
    const habitControlEl = document.querySelector(`#${controlId}`);
    if (habitControlEl) {
      habitControlEl.style.display = display;
    }
  }


function setQuote() {
    fetch('https://api.quotable.io/random')
        .then((response) => response.json())
        .then((data) => {
            const quoteEl = document.querySelector('#loginQuote');
            const sourceEl = document.querySelector('#loginQuoteSource');

            quoteEl.textContent = "\"" + data.content + "\"";
            sourceEl.textContent = "- " + data.author;
        });
}

setQuote();