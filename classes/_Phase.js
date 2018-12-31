class _Phase extends require( './_Class' ) {
	
	constructor() {
		super();
		
		this.sessions = {};
	}
	
	// override these
	Start( session ) {} // load for session
	Stop( session ) {} // unload for session
	Render( connection ) {} // render current state to connection
	
	AddSession( session ) {
		var id = session.id;
		if ( this.sessions[ id ] ) {
			console.log( 'duplicate session' );
			return;
		}
		this.sessions[ id ] = session;
		this.Start( this.sessions[ id ] );
	}
	
	RemoveSession( session ) {
		var id = session.id;
		if ( !this.sessions[ id ] ) {
			console.log( 'session not found' );
			return;
		}
		this.Stop( this.sessions[ id ] );
		delete this.sessions[ id ];
	}
	
}

module.exports = _Phase;
