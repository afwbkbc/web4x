class Session {
	
	// TODO: db
	
	constructor( manager, id ) {
		this.manager = manager;
		this.id = id;
		this.phases = {};
		this.contexts = {};
		this.connections = {};
	}
	
	// add session to phase ( for all connections )
	EnterPhase( phase ) {
		if ( this.phases[ phase.id ] ) {
			console.log( 'phase already added' );
			return;
		}
		this.phases[ phase.id ] = phase;
		this.phases[ phase.id ].AddSession( this );
	}
	
	// remove session from phase ( for all connections )
	LeavePhase( phase ) {
		if ( !this.phases[ phase.id ] ) {
			console.log( 'phase not added' );
			return;
		}
		this.phases[ phase.id ].RemoveSession( this );
		delete this.phases[ phase.id ];
	}
	
	RenderPhase( phase, connection ) {
		phase.Render( this.contexts[ phase.id ], connection );
	}
	
	RenderPhases( connection ) {
		for ( var k in this.phases )
			this.RenderPhase( this.phases[ k ], connection );
	}
	
	AddConnection( connection ) {
		var id = connection.id;
		if ( this.connections[ id ] ) {
			console.log( 'duplicate connection' );
			return;
		}
		this.connections[ id ] = connection;
		for ( var k in this.phases ) {
			var phase = this.phases[ k ];
			phase._RenderStart( this.contexts[ phase.id ], this.connections[ id ] );
		}
	}
	
	RemoveConnection( connection ) {
		var id = connection.id;
		if ( !this.connections[ id ] ) {
			console.log( 'connection not found' );
			return;
		}
		for ( var k in this.phases[ k ] ) {
			var phase = this.phases[ k ];
			phase._RenderStop( this.contexts[ phase.id ], this.connections[ id ] );
		}
		delete this.connections[ id ];
	}
	
	Update( callback ) { // updates state on every connection, callback provides connection as parameter
		for ( var k in this.connections )
			callback( this.connections[ k ] );
	}

}

module.exports = Session;
