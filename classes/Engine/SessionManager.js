class SessionManager extends require( './_Module' ) {
	
	// TODO: db
	
	constructor( engine ) {
		super( engine );

		this.Md5 = require( 'md5' );
		this.Session = require( './SessionManager/Session' );
		this.sessions = {};
	}
	
	CreateSession() {
		var id = null;
		do {
			id = this.Md5( Math.random() % 99999999 );
		} while ( this.sessions[ id ] );
		
		this.sessions[ id ] = new this.Session( this, id );
		
		return this.sessions[ id ];
	}
	
	GetSession( id ) {
		if ( !this.sessions[ id ] )
			return this.CreateSession();
		return this.sessions[ id ];
	}
}

module.exports = SessionManager;
