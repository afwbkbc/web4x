class _Session extends require( '../_Command' ) {
	
	Execute( connection, data ) {
		if ( connection.session )
			connection.SendError( 'session already set' );
		else {
			var manager = connection.web.engine.modules.sessionmanager;
			var session = null;
			if ( data && data.id )
				session = manager.GetSession( data.id );
			if ( !session )
				session = manager.CreateSession();
			connection.session = session;
			session.AddConnection( connection );
			connection.Send( 'SetSession', {
				id: session.id,
			} );
		}
	}
	
}

module.exports = _Session;
