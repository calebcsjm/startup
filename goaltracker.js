
if (localStorage.getItem("userName")) {
    const headerEl = document.querySelector('#goalTrackerPageTitle');
    headerEl.textContent = getUserName() + "'s Priority";
}

function getUserName() {
    console.log("Getting username");
    return localStorage.getItem('userName') ?? 'Mystery User';
}

function updateHabitInfo() {
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
    }
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

    // in the data, if there is an entry for that date, then the habit was completed. if no data, it was not completed
    constructor() {
        console.log('in the Habit constructor')
        // if there is data stored, if so, populate it
        this.data = this.getDataFromDatabase(getUserName());
        if (this.data != null) {
            this.processData();
            this.setValues();
        }
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
        this.frequency = this.daysHabitCompleted / this.daysSinceStart;
        this.score = this.frequency * this.daysSinceStart;
    }

    calculateDaysSinceStart() {
        // convert all the dates into UTC objects
        const dates = Object.keys(this.data["history"])
        console.log(dates)
        const datesUTC = []
        for (const date of dates) {
            const temp = date.split("-");
            console.log(temp)
            datesUTC.push(new Date(temp[0], temp[1] - 1, temp[2]))
        }
        console.log(datesUTC)

        // sort them to find the earliest
        const earliestDate = datesUTC.sort()[0];
        console.log(earliestDate);

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

    }

    getCalendarDate() {
        return new Date().toISOString().split('T')[0];
    }
}

const habit = new Habit();