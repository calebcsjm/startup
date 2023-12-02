async function loadScores() {
  let scores = [];
  try {
    const response = await fetch('/api/scoreboard');
    scores = await response.json();

    console.log("successfully ran /api/scoreboard");
    console.log("Scoreboard:");
    console.log(scores);
    // localStorage.setItem("highScoreData", JSON.stringify(scores));
  } catch {
    console.log("/api/scoreboard failed");

    // load local storage
    // const scoresText = localStorage.getItem('highScoreData');
    // if (scoresText) {
    //   scores = JSON.parse(scoresText);
    //   console.log("scores just after parsing:");
    //   console.log(scores);
    // }
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

// Functionality for peer communication using WebSocket
function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  socket.onopen = (event) => {
    displayMsg('Ready for updates on other habit trackers!');
  };
  socket.onclose = (event) => {
    displayMsg('Unable to get updates on other habit trackers =\'( ');
  };
    socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
    displayMsg(msg.msg);
  };
}

function displayMsg(msg) {
  const chatText = document.querySelector('#live-goal-updates');
  chatText.innerHTML = `<li class="goal-update"> ${msg} </li>` + chatText.innerHTML;
}


function broadcastEvent(msg) {
  const event = {
    msg: msg
  };
  this.socket.send(JSON.stringify(event));
}

loadScores();
configureWebSocket();
// new HabitWebSocket();

// export default {broadcastEvent}