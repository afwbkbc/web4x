class Render extends require( '../_Command' ) {
	
	Execute( connection, data ) {
		this.Require( connection, [ 'session' ], ( r ) => {
			r.session.RenderPhase( connection );
		});
	}
	
}

module.exports = Render;
