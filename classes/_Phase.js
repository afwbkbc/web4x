class _Phase extends require( './_Class' ) {
	
	constructor() {
		super();
		
		this.PhaseSessionContext = require( './Phase/PhaseSessionContext' );
		this.Canvas = require( './Engine/Renderer/Canvas' );
		
		this.contexts = {};
		this.assets = {};
	}
	
	// override these
	Start( ctx ) {} // load for session context. initialization of all non-visible stuff goes here
	Stop( ctx ) {} // unload for session context. deinitialization of all non-visible stuff goes here
	RenderStart( ctx, connection ) {} // load for connection. prepare visible stuff such as UI on connection
	Render( ctx, connection ) {} // render current state to connection
	RenderStop( ctx, connection ) {} // unload for connection. remove visible stuff such as UI on connection
	
	_RenderStart( context, connection ) {
		context.LoadCanvases( connection );
		context.LoadAssets( connection, Object.keys( this.assets ) );
		this.RenderStart( context, connection );
	}
	
	_RenderStop( context, connection ) {
		this.RenderStop( context, connection );
		context.UnloadAssets( connection, Object.keys( this.assets ) );
		context.UnloadCanvases( connection );
	}
	
	AddSession( session ) {
		var id = session.id;
		if ( this.contexts[ id ] ) {
			console.log( 'duplicate session' );
			return;
		}
		this.contexts[ id ] = new this.PhaseSessionContext( this, session );
		session.phase_context = this.contexts[ id ];
		this.Start( this.contexts[ id ] );
		this.contexts[ id ].session.Update( ( connection ) => {
			this._RenderStart( this.contexts[ id ], connection );
		});
	}
	
	RemoveSession( session ) {
		var id = session.id;
		if ( !this.contexts[ id ] ) {
			console.log( 'session not found' );
			return;
		}
		this.contexts[ id ].session.Update( ( connection ) => {
			this._RenderStop( this.contexts[ id ], connection );
		});
		this.Stop( this.contexts[ id ] );
		this.contexts[ id ].session.phase_context = null;
		this.contexts[ id ].destructor();
		delete this.contexts[ id ];
	}
	
	AddAsset( asset ) {
		if ( this.assets[ asset.id ] ) {
			console.log( 'duplicate asset' );
			return;
		}
		this.assets[ asset.id ] = asset;
	}
	
}

module.exports = _Phase;
