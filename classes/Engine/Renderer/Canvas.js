var G_canvas_id = 0;

class Canvas {
	
	constructor( resolution ) {
		
		if ( typeof( resolution ) === 'array' ) {
			if ( resolution.length != 2 ) {
				console.log( 'invalid resolution array' );
				return;
			}
			this.width = resolution[ 0 ];
			this.height = resolution[ 1 ];
		}
		else if ( typeof( resolution ) === 'string' ) {
			switch ( resolution ) {
				case 'fullscreen':
					 // TODO: make configurable?
					this.width = 1920;
					this.height = 1080;
					break;
				default:
					console.log( 'invalid resolution string' );
			}
		}
		this.id = ++G_canvas_id;
		
	}
	
	destructor() {
		
	}
	
}

module.exports = Canvas;
