class HabitEventNotifier {
    events = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) => {
            this.receiveEvent({
                msg: 'Ready for updates on other habit trackers!'
            });
        };
        this.socket.onclose = (event) => {
            this.receiveEvent({
                msg: 'Unable to get updates on other habit trackers =\'( '
            });
        };
        this.socket.onmessage = async (msg) => {
            console.log("HabitEventNotifier, onmessage");
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch {console.log("Failed to parse and recieveEvent")}
        };
    }
    displayMsg(msg) {
        const chatText = document.querySelector('#live-goal-updates');
        chatText.innerHTML = `<li class="goal-update"> ${msg} </li>` + chatText.innerHTML;
    } 

    broadcastEvent(msg) {
        const event = {
            msg: msg
        };
        this.socket.send(JSON.stringify(event));
    }
    
    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(event) {
        this.events.push(event);

        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
            handler(e);
            });
        });
    }
  }
  
  const HabitNotifier = new HabitEventNotifier();
  export {HabitNotifier};