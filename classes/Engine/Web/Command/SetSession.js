class SetSession extends require( '../_Command' ) {
	
	Execute( connection, data ) {
		if ( connection.session )
			connection.SendError( 'session already set' );
		else {
			var manager = connection.web.engine.modules.sessionmanager;
			var session = manager.GetSession( data.id );
			if ( !session )
				session = manager.CreateSession();
			connection.session = session;
			connection.Send( 'SetSession', {
				id: session.id,
			} );
		}
	}
	
}

module.exports = SetSession;
