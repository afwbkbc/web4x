class Image extends require( './_UIElement' ) {

	Render( r, m ) {
		console.log( this.options );
		var image = this.ui.GetAsset( this.options.id );
		if ( !image ) {
			console.log( 'missing image asset "' + this.options.id + '"' );
			return;
		}
		r.Image({
			coords: this.options.coords,
			id: image.id,
		});
		
	}
	
}

module.exports = Image;
