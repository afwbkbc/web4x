var G_event_id = 0;

class Event {
	
	constructor( type, callback, options ) {
		this.type = type;
		this.callback = callback;
		this.options = options ? options : {};
		
		this.id = ++G_event_id;
	}
	
}

module.exports = Event;
