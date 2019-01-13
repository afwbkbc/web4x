class Event extends require( '../_Command' ) {
	
	Execute( connection, data ) {
		this.Require( connection, [ 'session' ], ( r ) => {
			
			console.log( 'EVENT', r.session ); // TODO: wip
			
			/*var phase = r.phases[ data.phase ];
			if ( !phase ) {
				console.log( 'phase "' + data.phase + '" does not exist' );
				return;
			}
			r.session.RenderPhase( phase, connection );*/
		});
	}
	
}

module.exports = Event;
