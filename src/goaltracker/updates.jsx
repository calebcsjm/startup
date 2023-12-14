import React from 'react';

import { HabitNotifier } from './notifier';

export function Updates() {
    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        HabitNotifier.addHandler(handleHabitEvent);

        return () => {
            HabitNotifier.removeHandler(handleHabitEvent);
        }
    })

    function handleHabitEvent(event) {
        console.log(`Received event: ${event}`);
        setEvent([...events, event]);
    }

    function createMessageArray() {
        console.log("in the createMessageArray function");
        console.log(`events length: ${events.length}`);

        const messageArray = [];
        for (const [i, event] of events.entries()) {
            console.log(`event: ${event}`);

            const message = event.msg;
            
            console.log(`message: ${message}`);

            if (message != null) {
                messageArray.push(
                    <li key={i} className='event'>
                        {message}
                    </li>
                );
            }
        }
        return messageArray.reverse();
    }

    return (
        <div class="score-updates"> 
        <h4 class="update-heading">Live Updates:</h4>
        <ul class="notification" id="live-goal-updates">
          {createMessageArray()}
        </ul>
      </div>
      );
}