const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const fs = require('fs');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.username)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.username, req.body.password);
  
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
  });
  
  // GetAuth token for the provided credentials
  apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.username);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });
  
  // DeleteAuth token if stored in cookie
  apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
  });
  
  // GetUser returns information about a user
  apiRouter.get('/user/:username', async (req, res) => {
    const user = await DB.getUser(req.params.username);
    if (user) {
      const token = req?.cookies.token;
      res.send({ username: user.username, authenticated: token === user.token });
      return;
    }
    res.status(404).send({ msg: 'Unknown' });
  });
  
  // secureApiRouter verifies credentials for endpoints
  var secureApiRouter = express.Router();
  apiRouter.use(secureApiRouter);
  
  secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  });

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

// update the stats for a user, so that we can query them easily when finding the high scores
apiRouter.post('/updateStats', async (req, res) => {
    const userData = await DB.updateUserStats(req.body);
    console.log("blank space");
    res.send(userData);
});

// get scoreboard
apiRouter.get('/scoreboard', async (_req, res) => {
    const scores = await DB.getScoreboard();
    res.send(scores);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }
  
const httpService = app.listen(port, () => {    
    console.log(`Listening on port ${port}`);
});

peerProxy(httpService);