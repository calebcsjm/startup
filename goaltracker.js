class HabitWebSocket {
    constructor() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {
            this.displayMsg('Ready for updates on other habit trackers!');
        };
        this.socket.onclose = (event) => {
            this.displayMsg('Unable to get updates on other habit trackers =\'( ');
        };
        this.socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            this.displayMsg(msg.msg);
        };
    }
    displayMsg(msg) {
        const chatText = document.querySelector('#live-goal-updates');
        chatText.innerHTML = `<li class="goal-update"> ${msg} </li>` + chatText.innerHTML;
      }
      
    broadcastEvent(msg) {
        const event = {
            msg: msg
        };
        this.socket.send(JSON.stringify(event));
    }
}

const socket = new HabitWebSocket();

if (localStorage.getItem("userName")) {
    const headerEl = document.querySelector('#goalTrackerPageTitle');
    headerEl.textContent = getUserName() + "'s Priority";
}

function getUserName() {
    console.log("Getting username");
    return localStorage.getItem('userName') ?? null;
}

async function setHabitInfo() {
    // store the habit name and description (just in local storage for now) - this will add it to the database
    // once that is functional, and then we will create a new Habit instance to populate everything with the new 
    // data
    const habitNameEl = document.querySelector('#habit-name');
    const habitDescEl = document.querySelector('#habit-description');
    console.log("In updateHabit Info, created 2 element vars")
    console.log(`habit name: ${habitNameEl.value}`);
    console.log(`habit desc: ${habitDescEl.value}`);

    if (habitDescEl.value != "" && habitNameEl.value != "") {
        const username = getUserName()
        // const password = getPassword()
        const habitName = habitNameEl.value;
        const habitDesc = habitDescEl.value;
        const habit = {username: username, habitName: habitName, habitDesc: habitDesc, history: []};

        // Set the habit name and description for the user
        try {
            const response = await fetch('/api/setHabit', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(habit)
            });
            console.log("waiting on the response from /api/setHabit")
            // if it runs successfully, use the data it returns to create a new habit object
            const data = await response.json();
            console.log("successfully ran /api/setHabit");
            console.log("Response of the /setHabit call:");
            console.log(data);
            
        } catch {
            console.log("The /api/setHabit call failed");
        }

        new Habit();
    }
}

function getTodaysDate() {
    return new Date(new Date().setHours(24,0,0,0));
}

async function completedHabit() {
    // once the database will set up, this will add today to the list of days where the user has completed
    // their habit
    console.log("In completedHabit() function");

    // store dates in the database as Date objects
    const todaysDate = getTodaysDate();
    const date = {username: getUserName(), date: todaysDate};
    
    try {
        const response = await fetch('/api/completeHabit', {
            method: 'POST', 
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(date)
        });
        const userData = await response.json();
        console.log("The /api/completeHabit ran successfully");
        const habit = new Habit(completeHabitInitialized=true);

        // websocket, tell other users that they did their habit for the day
        // first check to see if this habit is actually the calculated one, or empty
        console.log("completedHabit, the new habit created:");
        console.log(habit);

        // scoreSocket.broadcastEvent(`${getUserName()} completed their habit for the day! Their new score: ${habit.score}`);
    } catch {
        console.log("The /api/completeHabit threw an error and was caught");
    }
}

class Habit {
    data;
    habitName;
    habitDescription;
    daysSinceStart;
    daysHabitCompleted;
    frequency;
    score; 
    historyDates;
    // datesUTC;

    // in the data, if there is an entry for that date, then the habit was completed. if no data, it was not completed
    constructor(completeHabitInitialized=false) {
        console.log('in the Habit constructor')
        // call a mockConstructor, which can be async
        this.mockConstructor(completeHabitInitialized);
    }

    async mockConstructor(completeHabitInitialized) {
        const response = await this.getDataFromDatabase(getUserName());

        if (response != null) {
            this.data = response;
            this.historyDates = [];
            const tempHistory = response["history"];
            for (let dateString of tempHistory) {
                const tempDate = new Date(dateString);
                this.historyDates.push(tempDate);
            }

            this.processData();
            this.setValues();
            // update the frequency values in the database
            if (completeHabitInitialized) {
                console.log("Habit mock constructor: updating the stats");
                this.updateStats();
                socket.broadcastEvent(`${getUserName()} completed their habit today. Their new score: ${this.score}`);
            }
            
            // habit is already set, so hide the set habit button
            const setHabitButton = document.getElementById("setHabitButton");
            setHabitButton.style.display = "none";
            // if the habit was already completed today, hide the button
            const completedHabitButton = document.getElementById("habitTodayButton");
            if (this.completedHabitToday()) {
                completedHabitButton.style.display = "none";
            } else {
                completedHabitButton.style.display = "unset";
            }
        } else {
            console.log("In constructor... the data value is null");
            // hid the completed habit today button, and show the set button
            const completedHabitButton = document.getElementById("habitTodayButton");
            completedHabitButton.style.display = "none";
            const setHabitButton = document.getElementById("setHabitButton");
            setHabitButton.style.display = "unset";
        }
        // if no data has been set yet, it just results to the defaults
        this.populateTable();   
    }

    completedHabitToday() {
        // once the data is loaded, determine if today's date is already included
        const dateMatch = (element) => element.getTime() === getTodaysDate().getTime();
        
        if (this.historyDates.some(dateMatch)) {
            return true;
        } else {
            return false; 
        }
    }

    async getDataFromDatabase() {
        // this is where I would get the data from the database, likely in a json format. But for now I will just return a pre-defined json file
        console.log("In the getDataFromDatabase function");
        console.log(`Username: ${getUserName()}`);
        const user = {username: getUserName()};
        try {
            console.log("getDataFromDatabase: entered try");
            const response = await fetch('/api/getUserInfo', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(user)
            });
            console.log("getDataFromDatabase: sent get request");
            const userData = await response.json();
            console.log("getDataFromDatabase: Successfully retieved data");
            return userData;
        } catch {
            console.log("getDataFromDatabase: api call failed");
            // unable to get user data, they must not be in the database
            return null;
        }
    }

    processData() {
        this.habitName = this.data['habitName'];
        this.habitDescription = this.data['habitDesc'];
        this.daysHabitCompleted = this.historyDates.length
        this.daysSinceStart = this.calculateDaysSinceStart();
        if (this.daysSinceStart === 0) {
            this.frequency = 0;
        } else {
            this.frequency = this.daysHabitCompleted / this.daysSinceStart;
        }
        this.score = this.frequency * this.daysHabitCompleted;
    }

    async updateStats() {
        console.log("In the updateStats function");
        const userStats = {username: getUserName(), days: this.daysHabitCompleted, frequency: this.frequency, score: this.score};
        console.log("The userStats dict to be passed to the DB:");
        console.log(userStats);
        try {
            const response = await fetch('/api/updateStats', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(userStats)
            });
            console.log(response);
        } catch {
            console.log("udpateStats: api call failed");
            // unable to get user data, they must not be in the database
        }
        console.log("finished the updateStats function");
    }

    calculateDaysSinceStart() {
        // if there is no data, return 0
        if (this.historyDates.length === 0) {
            return 0;
        }
        // if this is the first day, return 1
        if (this.historyDates.length === 1 && this.completedHabitToday()){
            return 1;
        }

        const sortedDates = this.historyDates.sort((a,b)=> a.getTime() - b.getTime());
        const earliestDate = sortedDates[0]; // sort in reverse

        console.log(`Earliest date in data: ${earliestDate}`);

        // subtract from present to see how many days it has been
        const currentDate = getTodaysDate();
        const differenceInDays = (currentDate.getTime() - earliestDate.getTime()) / (1000 * 3600 * 24) + 1;
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
        console.log("In populateTable() function");
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
            const datesUTC = this.convertDatesToUTC(this.historyDates);
            console.log(`populateTable function, entriesUTC: ${datesUTC}`);
            let completedHabit2Weeks = []
            for (let i = 0; i < 14; i++) {
                const tempDate = startDate.setDate(startDate.getDate() + 1);
                console.log(`TempDate: ${tempDate}`);
                // it should be 1 not i, as it will update the actual value every time...
                if (datesUTC.includes(tempDate)) {
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

    getTableStartDate() {
        // get the end of the current week
        const todaysDate = getTodaysDate();
        const dayOfWeek = todaysDate.getDay();
        console.log(`Current Day of week (0 index): ${dayOfWeek}`)

        let startDate = new Date();
        startDate.setDate(todaysDate.getDate() - (dayOfWeek + 7));
        startDate.setHours(0,0,0,0);
        console.log(`Start date of table: ${startDate}`);
        return startDate;
    } 

    convertDatesToUTC(dates) {
        let datesUTC = []
        for (const date of dates) {
            datesUTC.push(date.getTime());
        }
        return datesUTC;
    }
}

const habit = new Habit();