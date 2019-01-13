class PhaseSessionContext {
	
	constructor( phase, session ) {
		this.phase = phase;
		this.session = session;
		
		this.canvases = {};
		this.events = {};
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
	
	LoadAssets( connection, phase, assets ) {
		connection.Send( 'LoadAssets', {
			phase: phase,
			assets: assets,
		});
	}
	
	UnloadAssets( connection, phase, assets ) {
		connection.Send( 'UnloadAssets', {
			phase: phase,
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
		
		this._SendEvents( connection, this.events );
	}
	
	AddEvents( events ) {
		for ( var k in events ) {
			var event = events[ k ];
			if ( this.events[ event.id ] ) {
				console.log( 'duplicate event add "' + event.id + '"' );
				continue;
			}
			this.events[ event.id ] = event;
		}
		this.session.Update( ( connection ) => { // TODO: test
			this._SendEvents( connection, events );
		});
	}
	
	RemoveEvents( events ) {
		// TODO: test
		
		var event_data = [];
		for ( var k in events ) {
			var event = events[ k ];
			if ( !this.events[ event.id ] ) {
				console.log( 'event "' + event.id + '" not set' );
				continue;
			}
			event_data.push( event.id );
			delete this.events[ event.id ];
		}
		this.session.Update( ( connection ) => { // TODO: test
			connection.Send( 'RemoveEvents', event_data );
		});
	}
	
	_SendEvents( connection, events ) {
		var event_data = [];
		for ( var k in events ) {
			var event = events[ k ];
			event_data.push({
				id: event.id,
				type: event.type,
			});
		}
		connection.Send( 'AddEvents', {
			events: event_data,
		});

	}
	
	destructor() {
		for ( var k in this.canvases )
			this.canvases[ k ].destructor();
		
		this.RemoveEvents( this.events );
	}
	
}

module.exports = PhaseSessionContext;
