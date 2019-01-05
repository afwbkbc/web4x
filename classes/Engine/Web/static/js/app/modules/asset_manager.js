window.App.Extend({
	
	assets: {
		loaded: {},
		toload: {},
		data: {},
	},
	
	LoadAssets: function( assets ) {
		for ( var k in assets ) {
			var asset = assets[ k ];
			if ( this.assets.loaded[ asset ] )
				continue;
			this.assets.toload[ asset ] = null;
		}
		// TODO: client-side caching
		var toload_k = Object.keys( this.assets.toload );
		if ( toload_k.length > 0 ) {
			this.SendMessage( 'GetAssets', {
				assets: toload_k,
			});
		}
		else
			this.StartPhase();
	},
	
	UnloadAssets: function( assets ) {
		console.log( 'unloadassets', assets );
	},
	
	ResetAssets: function() {
		for ( var k in this.assets )
			this.assets[ k ] = null;
	},
	
	AssetData: function( data ) {
		this.assets.data = data;
		var that = this;
		this.SetDataMessageHandler( function( data ) {
			that._OnAssetData( data );
		});
	},
	
	_OnAssetData( data ) {
		if ( data.size > this.assets.data.size ) {
			console.log( 'excessive asset data' );
			return;
		}
		if ( data.size < this.assets.data.size ) {
			console.log( 'partial asset data - not implemented' );
			return;
		}
		this.ClearDataMessageHandler();
		var id = this.assets.data.id;
		if ( this.assets.loaded[ id ] ) {
			console.log( 'asset already loaded' );
			return;
		}
		this.assets.loaded[ id ] = data;
		delete this.assets.toload[ id ];
		if ( Object.keys( this.assets.toload ).length == 0 ) {
			// all required assets loaded
			this.StartPhase();
		}
	},
	
});
