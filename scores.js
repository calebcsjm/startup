const highScoreData = {
    "highscores": [
        {"name": "习近平", "Frequency": 90, "Days": 100, "Score": 90},
        {"name": "Annie James", "Frequency": 70, "Days": 120, "Score": 84},
        {"name": "Gunter Spears", "Frequency": 85, "Days": 90, "Score": 77}
    ]
}

localStorage.setItem("highScoreData", JSON.stringify(highScoreData));

function loadScores() {
    let scores = [];
    const scoresText = localStorage.getItem('highScoreData');
    if (scoresText) {
      scores = JSON.parse(scoresText)["highscores"];
      console.log("scores just after parsing:");
      console.log(scores);
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
        nameTdEl.textContent = entry["name"];
        frequencyTdEl.textContent = entry["Frequency"];
        daysTdEl.textContent = entry["Days"];
        scoreTdEl.textContent = entry["Score"];
  
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