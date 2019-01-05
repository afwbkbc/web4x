window.App.AddRendererShape( 'image', {
	
	Draw( ctx, p ) {
		
		var c = p.coords;
		
		var asset = this.app.GetAsset( p.id );
		if ( !asset ) {
			console.log( 'asset "' + p.id + '" does not exist' );
			return;
		}
		
		ctx.drawImage( asset.image, c[ 0 ], c[ 1 ], c[ 2 ], c[ 3 ] );
			
	}
	
});
