class Render extends require( '../_Command' ) {
	
	Execute( connection, data ) {
		this.Require( connection, [ 'session', 'phases' ], ( r ) => {
			var phase = r.phases[ data.phase ];
			if ( !phase ) {
				console.log( 'phase "' + data.phase + '" does not exist' );
				return;
			}
			r.session.RenderPhase( phase, connection );
		});
	}
	
}

module.exports = Render;
