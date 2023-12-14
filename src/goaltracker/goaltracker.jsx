import React from 'react';

import Button from 'react-bootstrap/Button';
import './goaltracker.css';

export function GoalTracker() {
  const [hasHabitInfo, setHasHabitInfo] = React.useState(false);
  const [isHabitCompletedToday, setHabitCompletedToday] = React.useState(false);

  function completedHabit() {

  }

  function setHabitInfo() {

  }

  return (
    <main className="container-fluid bg-secondary text-center">
      <h3>Habit History</h3>
      <table className="table table-dark table-striped-columns">
        <thead>
          <tr>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody id="habit-history">
        </tbody>
      </table>

      {hasHabitInfo && !isHabitCompletedToday (
        <Button variant='primary' id="habitTodayButton" onClick={() => completedHabit()}>
          Completed Habit Today 
        </Button>
      )}
      
      <div className="habit-overview">
        <label for="text">Habit</label>
        <input type="text" id="habit-name" name="varHabit" placeholder="Habit Name"/>    
      
        <label for="text">Description</label>
        <input type="text" id="habit-description" name="varHabitDesc" placeholder="Short Description"/>   
      
        <label for="count">Days Since Start</label>
        <input type="text" id="day-count" value="--" readonly />
      
        <label for="count">Frequency</label>
        <input type="text" id="habit-frequency" value="--" readonly />
      
        <label for="count">Score</label>
        <input type="text" id="habit-score" value="--" readonly />
      </div>

      {!hasHabitInfo && (<Button variant='primary' id="setHabitButton" onClick={() => setHabitInfo()}>
        Set Habit 
      </Button> )}
    </main>
  );
}