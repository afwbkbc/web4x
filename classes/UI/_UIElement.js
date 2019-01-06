class _UIElement {

	constructor( options ) {
		this.options = options ? options : {};
		
		this.Style = require( './Style' );
		
		this.children = [];
		this.ui = null;
	}
	
	// override this
	// r: Renderer object
	// m: custom modifiers:
	//		m.area: (optional) coordinates of draw area
	//		m.first_x: object is first in row
	//		m.first_y: object is first in column
	//		m.last_x: object is last in row
	//		m.last_y: object is last in column
	Render( r, m ) {}
	
	AddChild( child ) {
		this.children.push( child );
	}
	
	SetUI( ui ) {
		this.ui = ui;
		if ( !this.style )
			this.SetStyle( this.ui.style );
		for ( var k in this.children ) {
			var child = this.children[ k ];
			child.SetStyle( this.style );
			child.SetUI( ui );
		}
	}
	
	SetStyle( style ) {
		if ( this.options.style ) {
			//console.log( 'MERGE', style, this.options.style.custom );
			this.style = new this.Style( Object.assign( Object.assign( {}, style.custom ), this.options.style.custom ) );
		}
		else {
			//console.log( 'COPY', style.custom );
			this.style = new this.Style( Object.assign( {}, style.custom ) );
		}
		//console.log( 'STYLE', this.style );
	}
	
	// get normalized coords
	GetCoords( r, m ) {
		var coords = Object.assign( {}, m.area );
		coords[ 0 ] += r.style.button_margin_x * ( m.first_x ? 1 : 0.5 );
		coords[ 1 ] += r.style.button_margin_y * ( m.first_y ? 1 : 0.5 );
		coords[ 2 ] -= r.style.button_margin_x * ( m.last_x ? 1 : 0.5 );
		coords[ 3 ] -= r.style.button_margin_y * ( m.last_y ? 1 : 0.5 );
		return coords;
	}
	
}

module.exports = _UIElement;
