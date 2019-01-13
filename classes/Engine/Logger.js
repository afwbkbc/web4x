class Logger extends require( './_Module' ) {

	constructor( engine ) {
		super( engine );
		
		this.log_handlers = [];
	}
	
	Log( text ) {
		for ( var k in this.log_handlers )
			this.log_handlers[ k ]( text );
	}
	
	AddLogHandler( log_handler ) {
		console.log( 'ADDLOG' );
		this.log_handlers.push( log_handler );
	}
	
}

module.exports = Logger;
