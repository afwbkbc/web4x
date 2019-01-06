class _Block extends require( './_UIElement' ) {
	
	constructor( options ) {
		super( options );
		
		this.tilemode = null;
	}
	
	Render( r, m ) {
		
		r.Quad({
			coords: m.area,
			stroke: r.style.block_bordercolor,
			fill: r.style.block_backgroundcolor,
		});
		
		if ( this.children.length > 0 ) {
		
			// align children in grid
			var xfrom = m.area[ 0 ];
			var yfrom = m.area[ 1 ];
			var xto = m.area[ 2 ];
			var yto = m.area[ 3 ];
			var xspace = xto - xfrom;
			var yspace = yto - yfrom;
			
			var xstep, ystep;
			
			var rows, cols;
			
			switch ( this.tilemode ) {
				case 'column':
					rows = this.children.length;
					cols = 1;
					break;
				case 'row':
					rows = 1;
					cols = this.children.length;
					break;
				default:
					console.log( 'unsupported tilemode "' + this.tilemode + '"' );
					return;
			}
			
			var xstep = xspace / cols;
			var ystep = yspace / rows;
			
			var x = xfrom;
			var y = yfrom;
			
			for ( var k in this.children ) {
				
				var m = {
					area: [ x, y, x + xstep, y + ystep ],
					first_x: x == xfrom,
					first_y: y == yfrom,
					last_x: x == xto - xstep,
					last_y: y == yto - ystep,
				};
				
				var child = this.children[ k ];
				
				r.Style( child.style, () => {
					child.Render( r, m );
				});
				
				x += xstep;
				if ( x >= xto ) {
					x = xfrom;
					y += ystep;
				}
				
			}
			
		}
	}
	
}

module.exports = _Block;
