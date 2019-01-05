class _UIElement {

	constructor( options ) {
		this.options = options ? options : {};
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
		for ( var k in this.children )
			this.children[ k ].SetUI( ui );
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
