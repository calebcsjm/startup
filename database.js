const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const habitCollection = db.collection('score');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function setHabit(newUserInfo) {
    // first see if this user already exists
    const query = {
        "username" : newUserInfo["username"]
    };
    const user = await habitCollection.findOne(query);
    // if so delete it
    if (user != null) {
        await habitCollection.deleteOne(query);
    }
    // otherwise just insert it in regularly
    await habitCollection.insertOne(newUserInfo);
    const userData = await getUserInfo(newUserInfo['username']);
    return userData;
};

async function getUserInfo(usernameDict) {
    const query = {
        "username" : usernameDict["username"]
    };
    const userData = await habitCollection.findOne(query);
    if (userData === null) {
        return null;
    }
    else if ("username" in userData) {
        return userData;
    }
    else {
        return null;
    }
};

async function completeHabit(info) {
    const filter = {username: info["username"]};
    // change this to be history.date : dayofweek
    const date = info["date"];
    const historykey = "history." + date;
    const updateDoc = { $set: { [historykey]: info["dayOfWeek"]}};
    const result = await habitCollection.updateOne(filter, updateDoc);

    //return the updated doc for the user
    const userData = await getUserInfo({username: info['username']});
    return userData;
};

async function updateUserStats(userStats) {
    const filter = {username: userStats["username"]};
    const updateDoc = {$set: {days: userStats["days"], frequency: userStats["frequency"], score: userStats["score"]}};
    const result = await habitCollection.updateOne(filter, updateDoc);

    // getthe updated doc for the user, so we can make sure the updates are reflected
    const userData = await getUserInfo({username: userStats['username']});
    return userData;
};

async function getScoreboard() {};

// async function addScore(score) {
//   const result = await scoreCollection.insertOne(score);
//   return result;
// }

// function getHighScores() {
//   const query = { score: { $gt: 0, $lt: 900 } };
//   const options = {
//     sort: { score: -1 },
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }

module.exports = { setHabit, getUserInfo, completeHabit, getScoreboard, updateUserStats};


// 4 functions need to be implemented that will be connected to the database

// // set habit info, return the userInfo object
// apiRouter.post('/setHabit', (req, res) => {
//     updateUserInfo(req.body);
//     res.send(userInfo);
// });

// // get habit info - only persistent till service restarts
// apiRouter.post('/getUserInfo', (req, res) => {
//     // fs.appendFile("logfile.txt", req);
//     const userData = getUserInfo(req.body);
//     res.send(userData);
// });

// // add day to habit - this may need to also recalculate the scoreboard, and submit values for everyone
// apiRouter.post('/completeHabit', (req, res) => {
//     completeHabit(req.body);
//     res.send(userInfo);
// });

// // get scoreboard
// apiRouter.get('/scoreboard', (_req, res) => {
//     res.send(mockScoreData);
// });
