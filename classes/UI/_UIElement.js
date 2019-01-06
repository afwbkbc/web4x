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
	
}

module.exports = _UIElement;
