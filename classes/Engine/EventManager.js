class EventManager extends require( './_Module' ) {

	constructor( engine ) {
		super( engine );
		
		this.Event = require( './EventManager/Event' );
		
		this.events = {};
	}
	
	CreateEvent( type, options ) {
		var event = new this.Event( type, options );
		this.events[ event.id ] = event;
		return event;
	}
	
}

module.exports = EventManager;