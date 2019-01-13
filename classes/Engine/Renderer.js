class Renderer extends require( './_Module' ) {

	constructor( engine ) {
		super( engine );
		
		this.connection = null;
		this.canvas = null;
		this.default_style = new ( require( '../UI/Style' ) );
		this.style = this.default_style;
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
	
	// style wrapper
	Style( style, callback ) {
		var style_backup = this.style;
		this.style = style;
		callback();
		this.style = style_backup;
	}
	
	//// drawing API ////
	/*
	 * !!!
	 * in annotations below square brackets ( [] ) mean parameter is optional
	 * some common parameters:
	 *   coords: vec4 ( [x1,y1,x2,y2] ), x clamped between 0 and 1920, y between 0 and 1080 ( TODO: aspect correction, different aspect ratios handling, responsibility )
	 *   fill: fill color like "#aaa", if present shape will be filled with it, non-filled otherwise
	 *   stroke: border color, if present shape will get border, borderless otherwise
	 *   asset_id: id of Asset ( typically Image )
	 * !!!
	 */
	
	// draws a quad
	// { coords [fill] [stroke] }
	Quad( p ) {
		this.Draw( 'quad', p );
	}
	
	// draws an image
	// { coords asset }
	Image( p ) {
		this.Draw( 'image', p );
	}
	
	// draws text
	// { coords label [fill] [stroke] }
	Text( p ) {
		this.Draw( 'text', p );
	}
	
	//// drawing API end ////
	
	// main draw function
	Draw( shape, parameters ) {
		var p = Object.assign( {}, parameters );
		
		// normalize coords
		p.coords = Object.assign( {}, p.coords );
		p.coords[ 2 ] -= p.coords[ 0 ];
		p.coords[ 3 ] -= p.coords[ 1 ];
		
		this.connection.Send( 'Render', {
			canvas: this.canvas,
			shape: shape,
			parameters: p,
		});
	}
}

module.exports = Renderer;
