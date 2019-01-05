class GetAssets extends require( '../_Command' ) {
	
	Execute( connection, data ) {
		this.Require( connection, [ 'phase' ], ( r ) => {
			for ( var k in data.assets ) {
				var name = data.assets [ k ];
				var asset = r.phase.assets[ name ];
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
