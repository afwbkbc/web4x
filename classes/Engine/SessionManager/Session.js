class Session {
	
	// TODO: db
	
	constructor( manager, id ) {
		this.manager = manager;
		this.id = id;
		this.phase = null;
		this.connections = {};
	}
	
	// change phase in session ( for all connections )
	SetPhase( phase ) {
		if ( this.phase )
			this.phase.RemoveSession( this );
		this.phase = phase;
		this.phase.AddSession( this );
	}
	
	RenderPhase( connection ) {
		this.phase.Render( connection );
	}
	
	AddConnection( connection ) {
		var id = connection.id;
		if ( this.connections[ id ] ) {
			console.log( 'duplicate connection' );
			return;
		}
		this.connections[ id ] = connection;
	}
	
	RemoveConnection( connection ) {
		var id = connection.id;
		if ( !this.connections[ id ] ) {
			console.log( 'connection not found' );
			return;
		}
		delete this.connections[ id ];
	}
	
	Update( callback ) { // updates state on every connection, callback provides connection as parameter
		for ( var k in this.connections )
			callback( this.connections[ k ] );
	}

}

module.exports = Session;
