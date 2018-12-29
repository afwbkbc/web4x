class NewSession extends require( '../_Command' ) {
	
	Execute( connection ) {
		if ( connection.session )
			connection.SendError( 'session already set' );
		else {
			var session = connection.web.engine.modules.sessionmanager.CreateSession();
			connection.session = session;
			connection.Send( 'SetSession', {
				id: session.id
			} );
		}
	}
	
}

module.exports = NewSession;
