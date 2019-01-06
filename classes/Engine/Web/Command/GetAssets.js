class GetAssets extends require( '../_Command' ) {
	
	Execute( connection, data ) {
		this.Require( connection, [ 'phases' ], ( r ) => {
			for ( var k in data.assets ) {
				var name = data.assets [ k ];
				var asset = null;
				for ( var k in r.phases ) {
					var phase = r.phases[ k ];
					asset = phase.assets[ name ];
					if ( asset )
						break;
				}
				if ( !asset ) {
					console.log( 'asset "' + name + '" not found' );
					return;
				}
				connection.Send( 'AssetData', {
					id: asset.id,
					type: asset.type,
					size: asset.data.length,
				});
				connection.SendData( asset.data );
			}
		});
		
		
	}
	
}

module.exports = GetAssets;
