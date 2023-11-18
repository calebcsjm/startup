const express = require('express');
const app = express();
const DB = require('./database.js');

const fs = require('fs');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// set habit info, return the userInfo object
apiRouter.post('/setHabit', async (req, res) => {
    const userData = await DB.setHabit(req.body);
    // updateUserInfo(req.body);
    res.send(userData);
});

// get habit info - only persistent till service restarts
apiRouter.post('/getUserInfo', async (req, res) => {
    // fs.appendFile("logfile.txt", req);
    const userData = await DB.getUserInfo(req.body);
    res.send(userData);
});

// add day to habit - this may need to also recalculate the scoreboard, and submit values for everyone
apiRouter.post('/completeHabit', async (req, res) => {
    const userData = await DB.completeHabit(req.body);
    res.send(userData);
});

// get scoreboard
apiRouter.get('/scoreboard', (_req, res) => {
    res.send(mockScoreData);
});

let userInfo = {
    "username": null, 
    "password": null, 
    "habitName": null, 
    "habitDesc": null,
    "history": {}
}

const mockScoreData = {
    "highscores": [
        {"name": "习近平", "Frequency": 90, "Days": 100, "Score": 90},
        {"name": "Annie James", "Frequency": 70, "Days": 120, "Score": 84},
        {"name": "Gunter Spears", "Frequency": 85, "Days": 90, "Score": 77}
    ]
};

function updateUserInfo(newData) {
    for (const key in newData) {
        userInfo[key] = newData[key]
    }
}

// this will be expanded when we actually have a database. 
// for now it just returns the userInfo if it matches and null otherwise
function getUserInfo(username) {
    if (userInfo["username"] === username['username']) {
        return userInfo;
    } else {
        return null;
    }
}

function completeHabit(date) {
    userInfo['history'][date['date']] = date['dayOfWeek'];
}

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
  
app.listen(port, () => {    
    console.log(`Listening on port ${port}`);
});