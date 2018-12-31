class Render extends require( '../_Command' ) {
	
	Execute( connection, data ) {
		var game = connection.web.engine.game;
		if ( !game ) {
			console.log( 'no game defined' );
			return;
		}
		var session = connection.session;
		if ( !session ) {
			console.log( 'session undefined' );
			return;
		}
		if ( !session.phase ) {
			// run entry point
			if ( !game.entry_point ) {
				console.log( 'no entry point defined' );
				return;
			}
			session.SetPhase( game.entry_point );
		}
		session.RenderPhase( connection );
	}
	
}

module.exports = Render;
