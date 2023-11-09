const express = require('express');
const app = express();

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

// get habit info

// add day to habit - this may need to also recalculate the scoreboard, and submit values for everyone

// get habit history

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

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
  
app.listen(port, () => {    
    console.log(`Listening on port ${port}`);
});