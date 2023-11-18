async function loadScores() {
  let scores = [];
  try {
    const response = await fetch('/api/scoreboard');
    scores = await response.json();

    console.log("successfully ran /api/scoreboard");
    localStorage.setItem("highScoreData", JSON.stringify(scoreboard));
  } catch {
    console.log("/api/scoreboard failed");

    // load local storage
    const scoresText = localStorage.getItem('highScoreData');
    if (scoresText) {
      scores = JSON.parse(scoresText);
      console.log("scores just after parsing:");
      console.log(scores);
    }
  }
  const tableBodyEl = document.querySelector('#scores');

  if (scores.length) {
      let index = 1;
    for (const entry of scores) {
      const positionTdEl = document.createElement('td');
      const nameTdEl = document.createElement('td');
      const frequencyTdEl = document.createElement('td');
      const daysTdEl = document.createElement('td');
      const scoreTdEl = document.createElement('td');

      positionTdEl.textContent = index;
      index ++;
      nameTdEl.textContent = entry["username"];
      frequencyTdEl.textContent = entry["frequency"];
      daysTdEl.textContent = entry["days"];
      scoreTdEl.textContent = entry["score"];

      let rowEl = document.createElement('tr');
      rowEl.appendChild(positionTdEl);
      rowEl.appendChild(nameTdEl);
      rowEl.appendChild(frequencyTdEl);
      rowEl.appendChild(daysTdEl);
      rowEl.appendChild(scoreTdEl);
      
      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to score</td></tr>';
  }
}
  
loadScores();

// future web socket plug in
setInterval(() => {
  const score = Math.floor(Math.random() * 100);
  const chatText = document.querySelector('#live-goal-updates');
  chatText.innerHTML =
    `<li class="goal-update"> Tim completed their habit for the day. New Score: ${score}</div>` + chatText.innerHTML;
}, 7000);