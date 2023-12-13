import React from 'react';

import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/scoreboard')
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
        localStorage.setItem('scores', JSON.stringify(scores));
      })
      .catch(() => {
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
          setScores(JSON.parse(scoresText));
        }
      });
  }, []);

  const scoreRows = []
  if (scores.length) {
    let index = 1;
    for (const entry of scores) {
      scoreRows.push(
        <tr>
          <td>{index}</td>
          <td>{entry["username"]}</td>
          <td>{entry["frequency"]}</td>
          <td>{entry["days"]}</td>
          <td>{entry["score"]}</td>
        </tr>
      )
      index ++;
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }


  return (
    <main className="container-fluid bg-secondary text-center">
      <h3>
        Priority-Tracking Friends' Scoreboard
      </h3>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Frequency</th>
            <th>Days</th>
            <th>Score (Freq * Days)</th>
          </tr>
        </thead>
        <tbody id="scores">{scoreRows}</tbody>
      </table>
      
    </main>
  );
}