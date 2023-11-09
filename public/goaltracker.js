
if (localStorage.getItem("userName")) {
    const headerEl = document.querySelector('#goalTrackerPageTitle');
    headerEl.textContent = getUserName() + "'s Priority";
}

function getUserName() {
    console.log("Getting username");
    return localStorage.getItem('userName') ?? 'Mystery User';
}

function getPassword() {
    console.log("Getting password");
    return localStorage.getItem('password') ?? 'Mystery User';
}

function setHabitInfo() {
    // store the habit name and description (just in local storage for now) - this will add it to the database
    // once that is functional, and then we will create a new Habit instance to populate everything with the new 
    // data
    const habitNameEl = document.querySelector('#habit-name');
    const habitDescEl = document.querySelector('#habit-description');
    console.log("In updateHabit Info, created 2 element vars")
    console.log(`habit name: ${habitNameEl.value}`);
    console.log(`habit desc: ${habitDescEl.value}`);

    if (habitDescEl.value != "" && habitNameEl.value != "") {
        console.log("Set local storage values")
        localStorage.setItem("habitSet", true);
        localStorage.setItem("habitName", habitNameEl.value);
        localStorage.setItem("habitDesc", habitDescEl.value);

        data = {
            "username": getUserName(), 
            "password": getPassword(), 
            "habitName": habitNameEl.value, 
            "habitDescription": habitDescEl.value,
            "history": {}
        };
    
        const newHabit = new Habit(data);
    }
}

function completedHabit() {
    // once the database will set up, this will add today to the list of days where the user has completed
    // their habit
    console.log("In completedHabit() function");
}

class Habit {
    // history in sample data is a dictionary of date to the day of the week
    sampledata = {
        "username": "caleb",
        "password": "harding",
        "habitName": "Anki", 
        "habitDescription": "Do all my Anki reviews",
        "history": {
            "2023-10-28": 5,
            "2023-10-26": 3,
            "2023-10-25": 2,
            "2023-10-23": 0,
            "2023-10-20": 4
        }
    };
    data;
    habitName;
    habitDescription;
    daysSinceStart;
    daysHabitCompleted;
    frequency;
    score;
    datesUTC;

    // in the data, if there is an entry for that date, then the habit was completed. if no data, it was not completed
    constructor(inputdata) {
        console.log('in the Habit constructor')
        // if there is data stored, if so, populate it
        if (inputdata != null) {
            this.data = inputdata;
        } else {
            this.data = this.getDataFromDatabase(getUserName());
        }
        if (this.data != null) {

            this.processData();
            this.setValues();
            
            // hid the set button, and show the habit today button
            const setHabitButton = document.getElementById("setHabitButton");
            setHabitButton.style.display = "none";
            const completedHabitButton = document.getElementById("habitTodayButton");
            completedHabitButton.style.display = "unset";
        } else {
            console.log("In constructor... the data value is null");
            // hid the completed habit today button, and show the set button
            const completedHabitButton = document.getElementById("habitTodayButton");
            completedHabitButton.style.display = "none";
            const setHabitButton = document.getElementById("setHabitButton");
            setHabitButton.style.display = "unset";
        }
        this.populateTable();
        // if no data has been set yet, it just results to the defaults
    }

    getDataFromDatabase(username) {
        // this is where I would get the data from the database, likely in a json format. But for now I will just return a pre-defined json file
        console.log("In the getDataFromDatabase function")
        if (this.sampledata['username'] == username) {
            console.log("Username matches, returning data");
            return this.sampledata;
        } else {
            console.log("No match, returning null");
            return null;
        }
    }

    processData() {
        this.habitName = this.data['habitName'];
        this.habitDescription = this.data['habitDescription'];
        this.daysHabitCompleted = Object.keys(this.data["history"]).length
        this.daysSinceStart = this.calculateDaysSinceStart();
        if (this.daysSinceStart == 0) {
            this.frequency = "NA";
        } else {
            this.frequency = this.daysHabitCompleted / this.daysSinceStart;
        }
        this.score = this.frequency * this.daysSinceStart;
    }

    calculateDaysSinceStart() {
        // convert all the dates into UTC objects
        if (Object.keys(this.data["history"]).length == 0) {
            return 0;
        }
        const dates = Object.keys(this.data["history"])
        console.log(dates)
        const datesUTC = []
        for (const date of dates) {
            datesUTC.push(this.getMidnightUTCFromCalendarDate(date));
        }
        console.log(datesUTC);

        // sort them to find the earliest
        const earliestDate = datesUTC.sort()[0];
        console.log(`Earliest date in data: ${earliestDate}`);

        // subtract from present to see how many days it has been
        const currentDate = new Date();
        const differenceInDays = (currentDate.getTime() - earliestDate.getTime()) / (1000 * 3600 * 24);
        console.log(differenceInDays);
        return Math.floor(differenceInDays);
    }

    setValues() {
        document.getElementById("habit-name").value=this.habitName;
        document.getElementById("habit-description").value=this.habitDescription;
        document.getElementById("day-count").value=this.daysSinceStart;
        document.getElementById("habit-frequency").value=this.frequency;
        document.getElementById("habit-score").value=this.score;
    }

    populateTable() {
        // clear the table if anything is there already
        const habitHistoryEl = document.querySelector("#habit-history");
        habitHistoryEl.innerHTML = '';

        // placeholder if there is not data
        if (this.data == null) {
            const habitHistoryEl = document.querySelector("#habit-history");
            habitHistoryEl.innerHTML = '<tr><td colSpan=8>No habit data yet. Please enter a habit below.</td></tr>'
        } 
        else {
            const startDate = this.getTableStartDate();
            console.log(`table startDate: ${startDate}`);
            // create a dictionary for the last 14 days, with key as the box value, and the value true/false for whether they did it that day
            // let dictionary default to false
            const entriesUTC = this.convertCalendarDatesToMillisec(Object.keys(this.data['history']));
            console.log(`populateTable function, entriesUTC: ${entriesUTC}`);
            let completedHabit2Weeks = []
            for (let i = 0; i < 14; i++) {
                const tempDate = startDate.setDate(startDate.getDate() + 1);
                console.log(`TempDate: ${tempDate}`);
                // it should be 1 not i, as it will update the actual value every time...
                if (entriesUTC.includes(tempDate)) {
                    console.log("This date is included");
                    console.log(startDate);
                    completedHabit2Weeks[i] = true;
                } else {
                    completedHabit2Weeks[i] = false;
                }
            }
            console.log(`2 Week Habits: ${completedHabit2Weeks}`)

            const habitHistoryEl = document.querySelector("#habit-history");

            // populate the table with those values
            for (let i = 0; i < 2; i++) {
                const rowEl = document.createElement("tr");
                const sunEl = document.createElement('td');
                (completedHabit2Weeks[0 + 7*i]) ? sunEl.textContent = "X" : sunEl.textContent = "O";
                rowEl.appendChild(sunEl);
                const monEl = document.createElement('td');
                (completedHabit2Weeks[1 + 7*i]) ? monEl.textContent = "X" : monEl.textContent = "O";
                rowEl.appendChild(monEl);
                const tueEl = document.createElement('td');
                (completedHabit2Weeks[2 + 7*i]) ? tueEl.textContent = "X" : tueEl.textContent = "O";
                rowEl.appendChild(tueEl);
                const wedEl = document.createElement('td');
                (completedHabit2Weeks[3 + 7*i]) ? wedEl.textContent = "X" : wedEl.textContent = "O";
                rowEl.appendChild(wedEl);
                const thuEl = document.createElement('td');
                (completedHabit2Weeks[4 + 7*i]) ? thuEl.textContent = "X" : thuEl.textContent = "O";
                rowEl.appendChild(thuEl);
                const friEl = document.createElement('td');
                (completedHabit2Weeks[5 + 7*i]) ? friEl.textContent = "X" : friEl.textContent = "O";
                rowEl.appendChild(friEl);
                const satEl = document.createElement('td');
                (completedHabit2Weeks[6 + 7*i]) ? satEl.textContent = "X" : satEl.textContent = "O";
                rowEl.appendChild(satEl);

                habitHistoryEl.appendChild(rowEl);
            }
        }
    }

    getCalendarDate() {
        return new Date().toISOString().split('T')[0];
    }

    getMidnightUTCFromCalendarDate(calendarDate) {
        // calendarDate is a date in YYYY-MM-DD format
        const temp = calendarDate.split("-");
        console.log(temp);
        return new Date(temp[0], temp[1] - 1, temp[2]);
    }

    getCurrentDayOfWeek() {
        return new Date().getDay();
    }

    getTableStartDate() {
        // get the end of the current week
        var dayOfWeek = this.getCurrentDayOfWeek();
        console.log(`Current Day of week (0 index): ${dayOfWeek}`)
        var todayDate = this.getMidnightUTCFromCalendarDate(this.getCalendarDate());
        var endOfWeekSec = todayDate.setDate(todayDate.getDate() + (6 - dayOfWeek));
        console.log(`End of week UTC (today's date): ${endOfWeekSec}`)

        // return the date that is 14 days before the end of current week
        var endOfWeekDate = new Date(endOfWeekSec);
        var startDateSec = endOfWeekDate.setDate(endOfWeekDate.getDate() - 14);
        var startDate = new Date(startDateSec);
        console.log(`Start date of table: ${startDate}`);
        return startDate;
    } 

    convertCalendarDatesToMillisec(entries) {
        // 
        let entriesUTC = []
        for (const entry of entries) {
            entriesUTC.push(this.getMidnightUTCFromCalendarDate(entry).getTime());
        }
        return entriesUTC;
    }

    
}

const habit = new Habit();