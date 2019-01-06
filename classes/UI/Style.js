// all available styles and their defaults
const G_styles = {
	textcolor: 'black',
	font: '40px Arial Bold',
	block_backgroundcolor: '#ccc',
	block_bordercolor: '#444',
	button_backgroundcolor: '#aaa',
	button_bordercolor: '#444',
	button_textcolor: '#333',
	button_font: '30px Arial Bold',
	button_opacity: 1,
	button_margin_x: 16,
	button_margin_y: 12,
};

class Style {
	
	constructor( styles ) {
		this.custom = styles ? styles : {};
		if ( styles ) {
			for ( var k in styles ) {
				if ( k == 'custom' )
					continue;
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

module.exports = Style;
