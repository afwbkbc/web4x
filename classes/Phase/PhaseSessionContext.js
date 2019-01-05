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
	
	destructor() {
		for ( var k in this.canvases )
			this.canvases[ k ].destructor();
	}
	
}

module.exports = PhaseSessionContext;
