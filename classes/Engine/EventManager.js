class EventManager extends require( './_Module' ) {

	constructor( engine ) {
		super( engine );
		
		this.Event = require( './EventManager/Event' );
		
		this.events = {};
	}
	
	CreateEvent( type, callback, options ) {
		var event = new this.Event( type, callback, options );
		this.events[ event.id ] = event;
		return event;
	}
	
}

module.exports = EventManager;