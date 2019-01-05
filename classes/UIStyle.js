// all available styles and their defaults
const G_styles = {
	menu_block_backgroundcolor: '#ccc',
	menu_block_bordercolor: '#444',
};

class UIStyle {
	
	constructor( styles ) {
		if ( styles ) {
			for ( var k in styles ) {
				if ( !G_styles[ k ] ) {
					console.log( 'invalid style "' + k + '"' );
					continue;
				}
				this[ k ] = styles[ k ];
			}
		}
		for ( var k in G_styles )
			if ( !this[ k ] )
				this[ k ] = G_styles[ k ];
	}
	
}

module.exports = UIStyle;
