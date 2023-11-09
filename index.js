const express = require('express');
const app = express();

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
apiRouter.post('/setHabit', (req, res) => {
    updateUserInfo(req.body);
    res.send(userInfo);
});

// get habit info - only persistent till service restarts
apiRouter.post('/getUserInfo', (req, res) => {
    // fs.appendFile("logfile.txt", req);
    const userData = getUserInfo(req.body);
    res.send(userData);
});

// add day to habit - this may need to also recalculate the scoreboard, and submit values for everyone
apiRouter.post('/completeHabit', (req, res) => {
    completeHabit(req.body);
    res.send(userInfo);
});

// get scoreboard

let userInfo = {
    "username": null, 
    "password": null, 
    "habitName": null, 
    "habitDesc": null,
    "history": {}
}

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