if (localStorage.getItem("userName")) {
    const headerEl = document.querySelector('#goalTrackerPageTitle');
    headerEl.textContent = getUserName() + "'s Priority";
}

function getUserName() {
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
    name;
    description;
    days;
    frequency;
    score;

    // in the data, if there is data for that date, then the habit was completed. if no data, it was not completed
    constructor() {
        // if there is data stored, if so, populate it
        if (localStorage.getItem("habitSet")) {
            document.getElementById("habit-name").value=localStorage.getItem("habitName");
            document.getElementById("habit-description").value=localStorage.getItem("habitDesc");
            this.setCalculatedValues();
        }
        // if no data has been set yet, it just results to the defaults
    }


    calculateDays() {
        this.days = 5;
        return this.days;
    }

    calculateFrequency() {
        this.frequency = 0.5;
        return this.frequency;
    }

    calculateScore() {
        this.score = this.calculateDays() * this.calculateFrequency();
        return this.score;
    }

    setDays() {
        document.getElementById("day-count").value=this.calculateDays();
    }

    setFrequency() {
        document.getElementById("habit-frequency").value=this.calculateFrequency();
    }

    setScore() {
        document.getElementById("habit-score").value=this.calculateScore();
    }

    setCalculatedValues() {
        this.setDays();
        this.setFrequency();
        this.setScore();
    }

    getCalendarDate() {
        return new Date().toISOString().split('T')[0];
    }
}

const habit = new Habit();