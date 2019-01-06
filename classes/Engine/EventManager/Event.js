var G_event_id = 0;

class Event {
	
	constructor( type, options ) {
		this.type = type;
		this.options = options;
		
		this.id = ++G_event_id;
	}
	
}

module.exports = Event;
