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

async function getScoreboard() {
    const query = { score: { $gt: 0, $lt: 900 } };
    const options = {
        sort: { score: -1 },
        limit: 10,
    };
    const cursor = habitCollection.find(query, options);
    return cursor.toArray();
};

module.exports = { setHabit, getUserInfo, completeHabit, getScoreboard, updateUserStats};
