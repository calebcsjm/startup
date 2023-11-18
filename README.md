# startup
Startup application for CS 260 class at BYU

Notes for things learned while working on this project can be found [here](https://github.com/calebcsjm/startup/blob/main/notes.md).


## Project Proposal: Priorit ~~ies~~ y Habit Tracker

### Elevator Pitch
Have you ever decided to revamp your life, started on a bunch of new habits, and then failed at all of them? Or lost motivation at the same time you lost your "streak" and couldn't take starting over again? This website aims to help with that by forcing you to pick _**one**_ habit to work on, reporting your progress with a streak-loss-proof metric (days since starting * frequency), and encouraging competition with friends to see who can stick with it best. 

### Features
- Users create an account that stores their habit data
- Allows user to enter a goal name and description
- Shows a block history of the habit
- Creates a scoreboard for the habit scores using the calculation (days since starting) * (frequency rate) (i.e. 0.9 for 90% of days since staring)
- Info page with some of the philosophies around habits

### Technology Use

- **Authentication:** The website will use an username and password to create an account, which will have their habit history associated with it.
- **Database data:** A database will be necessary to populate the chart showing their habit history (filling in the block for each of the days that they reported doing it). Additionally, the database will store their "score," which will be shown in the leaderboard.
- **Websocket data:** This will be the scoring data, which will rerpresent every time another user updates their habit history, changing their score. 

### Images

![Rough sketch of the website design](/images/website_sketch.png)

Overall layout of the website. This is inspired in part by a feature of the flashcard app Anki (see below), which shows the days where reviews have been done, with different intensities of blue reflecting number of reviews, but generalized for any habit. 

![Image of history from Anki](/images/anki_tracker.png)

## HTML

This project implements the requirements in the following ways:
- HTML pages: My project is like Simon in that it uses 4 HTML pages with similar functions. All 4 of those pages were added: Home, Tracker, Scoreboard, and Philosophy
- Links between pages: All four pages are accessible at all times from the navigation bar (although it is a column at this point)
- Textual Content: A brief into to the philosophy/rational behind the applicaiton was added to the Philosophy page
- Placeholder for 3rd party service calls: On the Home page there is an inspiriation/thought-provoking quote, which I will get from the BestQuotes API
- Application Images: On the Philosophy page, an image is included from the book "Essentialism," which reflects the philosphy of the application
- Login placeholder: The login placeholder is on the Home page
- Database placeholder: The information presented in the Tracker page (currently implemented with checkboxes that are default checked) will be drawn from a database to track which days they have completed the Habit
- Websocket placeholder: The bottom of the Scoreboard page has realtime updates about who has completed their habit already that day, streaks, etc.

## CSS
- Header/Footer/Main Content: Implemented - used the same bootstrap framework that Simon used, and made it consistent accross all the pages
- Navigation elements: Implemented - navigation elements sit underneath the web-page title, and are highlighted for the given page
- Responsive to Resizing: Implemented - Elements move to stay in the middle center of the page, tables shrink and expand, and then header/footer disapper
- Application Elements: Not sure what this means... but I kept all the essential elements from the HTML project and included them in this iteration
- Application Text Content: Home page includes a quote of the day in a box, with different parts of the text aligned left/center/right. Attribution text on Philosophy page is resized, stylized and placed in a background. 
- Application Image: Image included on Philosophy page. 

## JavaScript
- Login: The user can login, and then that information is stored in local storage and used to change the header on the Tracker page. After logging in, the Home page changes to offer a logout option. 
- Database Data: The goaltracker.js file is will take a JSON that I will pull from a database in the future (it is defined locally now) and populate the Habit overview fields, in addition to populating a table with X's for days the habit was completed and O's for days it was missed. The time-related code was pretty messy. 
- Websocket: There is a Live Updates feature on the Scoreboard page (scores.js) that will use a websocket in the feature (it is similar to what the Simon-javascript had). I also have a placeholder for an API call on the Home page with the quote of the day. 
- Interaction Login: As mentioned above, the login page uses JavaScript to change substantially when a user logs in or out. It also moves the user to the Tracker page on Login. The Tracker Page starts out with an empty table that prompts input below, and then after a habit and description are entered it populates the table, calculates the values, removes the "set habit" button, and adds a "Completed Habit Today" button, which in the future will update the database. Login with username "caleb" to see the table populated with some dummy data, or with any other username to see the empty table and try entering a habit and description. 

## Startup Service
- HTTP service with Node and Express: Complete. Frontend code has all been moved into the public folder, and now the website is driven through the index.js file.
- Frontend served with express static middleware: Complete. See line 13 in the index.js file
- Frontend calls 3rd part services: Complete. I also used a quote generator in my project, on the login page. See login.js line 69. 
- Backend provides service endpoints: Complete. I defined 4 endpoints in index.js on lines 19-41, with additional logic implemented below.
- Frontend calls service endpoints: Complete. loadScores() on scores.js line 4 calls '/api/scoreboard', setHabitInfo() on goaltracker.js lines 35-55 calls '/api/setHabit', completedHabit() on goaltracker.js line 65-76 calls '/api/completeHabit', and getDataFromDatabase() on goaltracker.js lines 146-162 calls '/api/getUserInfo'. 

## Startup DB
- MongoDB created: Complete
- Backend endpoints for manipulating data: There are 2 endpoints to retrieve data and 3 to manipulate it. setHabit sets the initial info for a habit that is input, completeHabit adds the current day to the user's list of days that they completed the habit, and updateStats (which is called after completeHabit) updates the user's stats that are used for the scoreboard. getUserInfo queries all the data for a user from the database, and getScoreboard retrieves the 10 highest scoring users. 
- Stores data in MongoDB: Although the data is not very diverse yet, you can see what data is already stored by viewing the scoreboards page or logging in with the username of one of those individuals to see their data (for example, username "james" and password "asdf").

## Login
In all honesty, this was a really easy milestone, because we could basically just use the code from the Simon project... I made some small adjustements to use a username instead of an email, which had to be propogated throughout the code, and had to fix a few bugs, but other than that it was almost identical. Hopefully that is alright. 
- Supports new user registration: Complete. Create button on the home page allows for creation of new users
- Existing user authentication: Complete. I can log in as people that I previously registered. 
- Uses MongoDB: Complete. It creates an additional collection in MongoDB for the users that stores their username, hashed password, and token
- Restricts functionality: Complete. Users cannot access the other pages (like the scoreboard) until they have signed in
