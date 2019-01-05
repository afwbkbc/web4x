class PhaseSessionContext {
	
	constructor( phase, session ) {
		this.phase = phase;
		this.session = session;
		
		this.canvases = {};
	}
	
	AddCanvas( name, canvas ) {
		if ( this.canvases[ name ] ) {
			console.log( 'duplicate canvas' );
			return;
		}
		this.canvases[ name ] = canvas;
	}
	
	LoadCanvases( connection ) {
		for ( var k in this.canvases ) {
			var c = this.canvases[ k ];
			connection.Send( 'AddCanvas', {
				id: c.id,
				width: c.width,
				height: c.height,
			});
		}
	}
	
	UnloadCanvases( connection ) {
		for ( var k in this.canvases ) {
			var c = this.canvases[ k ];
			connection.Send( 'RemoveCanvas', {
				id: c.id,
			});
		}
	}
	
	LoadAssets( connection, assets ) {
		connection.Send( 'LoadAssets', {
			assets: assets,
		});
	}
	
	UnloadAssets( connection, assets ) {
		connection.Send( 'UnloadAssets', {
			assets: assets,
		});
	}
	
	Render( connection, canvas_id, callback ) {
		if ( !this.canvases[ canvas_id ] ) {
			console.log( 'invalid/missing canvas "' + canvas_id + '"' );
			return;
		}
		var r = this.phase.game.engine.modules.renderer;
		r.Render( connection, this.canvases[ canvas_id ], () => {
			callback( r );
		});
	}
	
	destructor() {
		for ( var k in this.canvases )
			this.canvases[ k ].destructor();
	}
	
}

module.exports = PhaseSessionContext;
