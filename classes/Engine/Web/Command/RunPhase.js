class RunPhase extends require( '../_Command' ) {
	
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
		var phase = null;
		if ( data && data.phase ) {
			// TODO
			console.log( 'not implemented' );
			return;
		}
		if ( !game.entry_point ) {
			console.log( 'no entry point defined' );
			return;
		}
		phase = game.entry_point;
		session.SetPhase( phase );
	}
	
}

module.exports = RunPhase;
