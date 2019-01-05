class _Command {
	
	// override this
	Execute( connection, data ) {}
	
	Require( connection, request, callback ) {
		var deps = {
			'phase': [ 'session' ],
		};
		for ( var target in deps ) {
			for ( var kk in deps[ target ] ) {
				var dep = deps[ target ][ kk ];
				if ( request.indexOf( dep ) < 0 )
					request.unshift( dep );
			}
		}
		var r = {};
		for ( var k in request ) {
			var o = request[ k ];
			switch ( o ) {
				case 'session':
					r[ o ] = connection.session;
					break;
				case 'game':
					r[ o ] = connection.web.engine.game;
					break;
				case 'phase':
					r[ o ] = r.session.phase;
					break;
				default:
					console.log( 'unknown require object "' + o + '"' );
					return;
			}
			if ( !r[ o ] ) {
				console.log( o + ' undefined' );
				return;
			}
		}
		callback( r );
	}
	
}

module.exports = _Command;
