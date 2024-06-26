class EventSystem {
    
    _events : any;

    constructor() {
        this._events = {};
    }
    
    ListenToEvent(event_id : string, callback : any) {

        if (this._events.hasOwnProperty(event_id)) {
            this._events[event_id].push(callback);
            return;
        }

        this._events[event_id] = [callback];
    }

    Deregister(event_id : string) {
        if (this._events.hasOwnProperty(event_id)) {
            this._events[event_id] = []
        }
    }

    Notify(event_id : string, parameters? : any) {
        if (this._events.hasOwnProperty(event_id)) {
            let eventLength = this._events[event_id].length;
            for (let i = 0; i < eventLength; i++) {
                this._events[event_id][i](event_id, parameters);
            }
        }  
    }
}

export default EventSystem;