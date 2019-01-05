class Renderer extends require( './_Module' ) {

	constructor( engine ) {
		super( engine );
		
		this.connection = null;
		this.canvas = null;
	}
	
	// entry function, selects connection and canvas for rendering, renders inside callback
	Render( connection, canvas, callback ) {
		if ( this.connection ) {
			console.log( 'recursive Render() detected' );
			return;
		}
		this.connection = connection;
		this.canvas = canvas.id;
		callback();
		this.canvas = null;
		this.connection = null;
	}
	
	//// drawing API ////
	/*
	 * !!!
	 * in annotations below square brackets ( [] ) mean parameter is optional
	 * some common parameters:
	 *   "coords" is vec4 ( [x1,y1,x2,y2] ), x clamped between 0 and 1919, y between 0 and 1079 ( TODO: aspect correction, different aspect ratios handling, responsibility )
	 *   "fill" is fill color, if present shape will be filled with it, non-filled otherwise
	 *   "stroke" is border color, if present shape will get border, borderless otherwise
	 * !!!
	 */
	
	// draws a quad
	// { coords [fill] [stroke] }
	Quad( p ) {
		this.Draw( 'quad', p );
	}
	
	//// drawing API end ////
	
	// main draw function
	Draw( shape, parameters ) {
		this.connection.Send( 'Render', {
			canvas: this.canvas,
			shape: shape,
			parameters: parameters,
		});
	}
}

module.exports = Renderer;
