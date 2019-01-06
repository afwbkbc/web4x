var G_phase_id = 0;

class _Phase extends require( './_Class' ) {
	
	constructor( name ) {
		super();

		this.id = ++G_phase_id;
		this.name = name;
		
		this.PhaseSessionContext = require( './Phase/PhaseSessionContext' );
		this.Canvas = require( './Engine/Renderer/Canvas' );
		
		this.contexts = {};
		this.assets = {};
		this.asset_ids = {};
	}
	
	// override these
	Start( ctx ) {} // load for session context. initialization of all non-visible stuff goes here
	Stop( ctx ) {} // unload for session context. deinitialization of all non-visible stuff goes here
	RenderStart( ctx, connection ) {} // load for connection. prepare visible stuff such as UI on connection
	Render( ctx, connection ) {} // render current state to connection
	RenderStop( ctx, connection ) {} // unload for connection. remove visible stuff such as UI on connection
	
	_RenderStart( context, connection ) {
		context.LoadCanvases( connection );
		context.LoadAssets( connection, this.name, this.asset_ids );
		this.RenderStart( context, connection );
	}
	
	_RenderStop( context, connection ) {
		this.RenderStop( context, connection );
		context.UnloadAssets( connection, this.name, this.asset_ids );
		context.UnloadCanvases( connection );
	}
	
	AddSession( session ) {
		var id = session.id;
		if ( this.contexts[ id ] ) {
			console.log( 'duplicate session' );
			return;
		}
		this.contexts[ id ] = new this.PhaseSessionContext( this, session );
		session.contexts[ this.name ] = this.contexts[ id ];
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
		this.contexts[ id ].session.contexts[ this.name ] = null;
		this.contexts[ id ].destructor();
		delete this.contexts[ id ];
	}
	
	AddAsset( asset ) {
		if ( this.assets[ asset.id ] ) {
			console.log( 'duplicate asset' );
			return;
		}
		if ( this.asset_ids[ asset.name ] ) {
			console.log( 'duplicate asset id' );
			return;
		}
		this.assets[ asset.id ] = asset;
		this.asset_ids[ asset.name ] = asset.id;
	}
	
	GetAsset( name ) {
		if ( !this.asset_ids[ name ] ) {
			console.log( 'asset "' + name +'" does not exist' );
			return;
		}
		return this.assets[ this.asset_ids[ name ] ];
	}
	
}

module.exports = _Phase;
