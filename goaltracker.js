if (localStorage.getItem("userName")) {
    const headerEl = document.querySelector('#goalTrackerPageTitle');
    headerEl.textContent = getUserName() + "'s Priority";
}

function getUserName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
}