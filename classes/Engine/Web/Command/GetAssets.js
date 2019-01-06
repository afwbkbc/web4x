class GetAssets extends require( '../_Command' ) {
	
	Execute( connection, data ) {
		this.Require( connection, [ 'phases' ], ( r ) => {
			var phase = r.phases[ data.phase ];
			if ( !phase ) {
				console.log( 'invalid phase "' + phase + '"' );
				return;
			}
			for ( var k in data.assets ) {
				var name = data.assets[ k ];
				var asset = phase.assets[ name ];
				if ( !asset ) {
					console.log( 'asset "' + name + '" not found' );
					return;
				}
				connection.Send( 'AssetData', {
					id: asset.id,
					phase: phase.name,
					type: asset.type,
					size: asset.data.length,
				});
				connection.SendData( asset.data );
			}
		});
		
		
	}
	
}

module.exports = GetAssets;
