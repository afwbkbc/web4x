class UI extends require( './_Phase' ) {
	
	constructor( name ) {
		super( 'ui/' + name );
		
		this.background = null;
		this.blocks = [];
		this.style = new ( require( './UIStyle' ) );
	}
	
	SetBackground( asset_name ) {
		this.background = asset_name;
	}
	
	Start( ctx ) {
		ctx.AddCanvas( 'ui', new this.Canvas( 'fullscreen' ) );
		console.log( 'UI START', ctx.session.id );
	}
	
	Stop( ctx ) {
		console.log( 'UI STOP', ctx.session.id );
	}
	
	Render( ctx, connection ) {
		console.log( 'UI RENDER', connection.session.id + '/' + connection.id );
		
		ctx.Render( connection, 'ui', ( r ) => {
			
			if ( this.background ) {
				var background = this.GetAsset( this.background );
				if ( !background ) {
					console.log( 'missing background asset' );
					return;
				}
				r.Image({
					coords: [ 0, 0, 1919, 1079 ],
					id: background.id,
				});
			}
			
			for ( var k in this.blocks ) {
				var block = this.blocks[ k ];
				var c = block.options.coords;
				
				r.Quad({
					coords: block.options.coords,
					stroke: this.style.menu_block_bordercolor,
					fill: this.style.menu_block_backgroundcolor,
				});
				
				console.log( block );
			}
			
			
		});
	}
	
	AddBlock( block ) {
		this.blocks.push( block );
	}
	
	SetStyle( style ) {
		this.style = style;
	}
}

module.exports = UI;
