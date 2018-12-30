class Session {
	
	// TODO: db
	
	constructor( manager, id ) {
		this.manager = manager;
		this.id = id;
		this.phase = null;
		this.connections = {};
	}
	
	SetPhase( phase ) {
		if ( this.phase )
			this.phase.RemoveSession( this );
		this.phase = phase;
		this.phase.AddSession( this );
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
	
}

module.exports = Session;
