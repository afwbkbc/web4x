window.App.Extend({
	
	assets: {
		loaded: {},
		toinit: {},
		data: {},
	},
	
	LoadAssets: function( assets ) {
		var toload = [];
		for ( var k in assets ) {
			var asset = assets[ k ];
			if ( this.assets.loaded[ asset ] )
				continue;
			toload.push( asset );
		}
		// TODO: client-side caching
		if ( toload.length > 0 ) {
			this.SendMessage( 'GetAssets', {
				assets: toload,
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
			this.assets[ k ] = {};
		this.ClearDataMessageHandler();
	},
	
	AssetData: function( data ) {
		this.assets.data = data;
		var that = this;
		this.SetDataMessageHandler( function( data ) {
			that._OnAssetData( data );
		});
	},
	
	_OnAssetData: function( data ) {
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
		this.assets.loaded[ id ] = this.assets.data;
		this.assets.data = {};
		this.assets.loaded[ id ].data = data;
		this.assets.toinit[ id ] = true;
		var that = this;
		this._InitAsset( this.assets.loaded[ id ], function() {
			if ( Object.keys( that.assets.toinit ).length == 0 ) {
				// all required assets loaded
				that.StartPhase();
			}
		});
	},
	
	_InitAsset: function( asset, callback ) {
		var id = asset.id;
		
		var that = this;
		var done = function() {
			delete that.assets.toinit[ id ];
			return callback();
		}
		
		switch ( asset.type ) {
			case 'image': {
				asset.image = new Image();
				asset.image.onload = done;
				asset.image.src = URL.createObjectURL( asset.data );
				break;
			}
			default:
				console.log( 'unknown asset type "' + asset.type + '"' );
				return;
		}
	},
	
	GetAsset( id ) {
		return this.assets.loaded[ id ];
	},
	
});
