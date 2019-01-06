class Session extends require( '../_Command' ) {
	
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
			if ( Object.keys( session.phases ).length == 0 ) { // not entered any phase yet, need to start game for this session
				var game = connection.web.engine.game;
				if ( !game ) {
					console.log( 'no game defined' );
					return;
				}
				if ( !game.entry_point ) {
					console.log( 'no game entry point defined' );
					return;
				}
				game.entry_point( session );
			}
		}
	}
	
}

module.exports = Session;
