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
