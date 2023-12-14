import React from 'react';

import Button from 'react-bootstrap/Button';
import './goaltracker.css';

function getTodaysDate() {
  return new Date(new Date().setHours(24,0,0,0));
}

function completedHabitToday(historyDates) {
  // once the data is loaded, determine if today's date is already included
  const dateMatch = (element) => element.getTime() === getTodaysDate().getTime();
  
  return historyDates.some(dateMatch) ? true: false;
  // if (historyDates.some(dateMatch)) {
  //     return true;
  // } else {
  //     return false; 
  // }
}

function calculateDaysSinceStart(historyDates) {
  // if there is no data, return 0
  if (historyDates.length === 0) {
      return 0;
  }
  // if this is the first day, return 1
  if (historyDates.length === 1 && completedHabitToday(historyDates)){
      return 1;
  }

  const sortedDates = historyDates.sort((a,b)=> a.getTime() - b.getTime());
  const earliestDate = sortedDates[0]; // sort in reverse

  console.log(`Earliest date in data: ${earliestDate}`);

  // subtract from present to see how many days it has been
  const currentDate = getTodaysDate();
  const differenceInDays = (currentDate.getTime() - earliestDate.getTime()) / (1000 * 3600 * 24) + 1;
  console.log(differenceInDays);
  return Math.floor(differenceInDays);
}

function getTableStartDate() {
  const todaysDate = getTodaysDate();
  const dayOfWeek = todaysDate.getDay();
  console.log(`Current Day of week (0 index): ${dayOfWeek}`)

  let startDate = new Date();
  startDate.setDate(todaysDate.getDate() - (dayOfWeek + 7));
  startDate.setHours(0,0,0,0);
  console.log(`Start date of table: ${startDate}`);
  return startDate;
} 

function convertDatesToUTC(dates) {
  let datesUTC = []
  for (const date of dates) {
      datesUTC.push(date.getTime());
  }
  return datesUTC;
}

export function GoalTracker({userName}) {
  
  const [userInfo, setUserInfo] = React.useState(null);
  const [update, setUpdate] = React.useState(false);
  let habitName;
  let habitDesc;
  let daysSinceStart = "NA";
  let daysHabitCompleted = "NA";
  let frequency = "NA";
  let score = "NA"; 
  let historyDates = [];
  let tableData = [];
  let completedHabitTodayBool;
  // const [habitName, setHabitName] = React.useState(null);
  // const [habitDescription, setHabitDescription] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/getUserInfo', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({username: userName})
    })
      .then((response) => response.json())
      .then((userInfo) => {
        console.log("in useEffect");
        console.log(userInfo);
        setUserInfo(userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
      })
      .catch(() => {
        const userInfoText = localStorage.getItem('userInfo');
        if (userInfoText) {
          setUserInfo(JSON.parse(userInfoText));
        }
      });
  }, [update]);

  function populateTable() {
    console.log("PopulateTable function");
    if (userInfo !== null) {
      const startDate = getTableStartDate();
      const datesUTC = convertDatesToUTC(historyDates);

      let completedHabit2Weeks = []
      for (let i = 0; i < 14; i++) {
          const tempDate = startDate.setDate(startDate.getDate() + 1);
          if (datesUTC.includes(tempDate)) {
              completedHabit2Weeks[i] = true;
          } else {
              completedHabit2Weeks[i] = false;
        }
      }
      console.log(`2 Week Habits: ${completedHabit2Weeks}`);

      for (let i = 0; i < 2; i++) {
        tableData.push(
          <tr key={i}>
            <td>{completedHabit2Weeks[0 + 7*i] ? "X" : "O"}</td>
            <td>{completedHabit2Weeks[1 + 7*i] ? "X" : "O"}</td>
            <td>{completedHabit2Weeks[2 + 7*i] ? "X" : "O"}</td>
            <td>{completedHabit2Weeks[3 + 7*i] ? "X" : "O"}</td>
            <td>{completedHabit2Weeks[4 + 7*i] ? "X" : "O"}</td>
            <td>{completedHabit2Weeks[5 + 7*i] ? "X" : "O"}</td>
            <td>{completedHabit2Weeks[6 + 7*i] ? "X" : "O"}</td>
          </tr>
        );
      }

    } else {
      tableData.push(
        <tr key='0'>
          <td colSpan='8'>No habit data yet. Please enter a habit below.</td>
        </tr>
      );
    }
  }

  if (userInfo !== null) {
    console.log("userInfo is not null");
    console.log(userInfo);
    habitName = userInfo["habitName"];
    habitDesc = userInfo["habitDesc"];

    const tempHistory = userInfo["history"];
      for (let dateString of tempHistory) {
          const tempDate = new Date(dateString);
          historyDates.push(tempDate);
      }
    console.log(`historyDates: ${historyDates}`);

    daysHabitCompleted = historyDates.length;
    daysSinceStart = calculateDaysSinceStart(historyDates);
    if (daysSinceStart === 0) {
      frequency = 0;
    } else {
      frequency = daysHabitCompleted / daysSinceStart;
    }
    score = frequency * daysSinceStart;
    completedHabitTodayBool = completedHabitToday(historyDates);
  }

  populateTable();

  function completedHabit() {

  }

  function setHabitInfo() {
    console.log("In setHabitInfo funciton");
    console.log(`habitName and habitDesc: ${habitName}, ${habitDesc}`);
    if (habitName != null && habitDesc != null){
      console.log("We can send the data");
      const habit = {username: userName, habitName: habitName, habitDesc: habitDesc, history: []};
      
      fetch('/api/setHabit', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(habit)
      })
      .then((response) => response.json())
      .then((userInfo) =>{
        console.log("successfully set and returned userInfo in setHabitInfo");
        setUserInfo(userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
      })
      .catch(() => {
        console.log("setHabit api call failed");
      })
      .finally(() => setUpdate(true)); // make the page re-render
    }
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
          {tableData}
        </tbody>
      </table>

      {(userInfo != null && completedHabitTodayBool === false) && 
      <Button variant='primary' id="habitTodayButton" onClick={() => completedHabit()}>
        Completed Habit Today 
      </Button>}
      
      <div className="habit-overview">
        <label for="text">Habit</label>
        <input 
          type="text" 
          id="habit-name" 
          name="varHabit" 
          placeholder="Habit Name"
          value={habitName}
          onChange={(e) => {habitName = e.target.value}}
        />    
      
        <label for="text">Description</label>
        <input 
          type="text" 
          id="habit-description" 
          name="varHabitDesc" 
          placeholder="Short Description"
          value={habitDesc}
          onChange={(e) => {habitDesc = e.target.value}}
        />   
      
        <label for="count">Days Since Start</label>
        <input type="text" id="day-count" value={daysSinceStart} readOnly />
      
        <label for="count">Frequency</label>
        <input type="text" id="habit-frequency" value={frequency} readOnly />
      
        <label for="count">Score</label>
        <input type="text" id="habit-score" value={score} readOnly />
      </div>

      {(userInfo === null) && <Button variant='primary' id="setHabitButton" onClick={() => setHabitInfo()}>
        Set Habit 
      </Button>}
    </main>
  );
}