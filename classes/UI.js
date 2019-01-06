class UI extends require( './_Phase' ) {
	
	constructor( name ) {
		super( 'ui/' + name );
		
		this.children = [];
		this.style = new ( require( './UI/Style' ) );
	}
	
	Start( ctx ) {
		ctx.AddCanvas( 'ui', new this.Canvas( 'fullscreen' ) );
		console.log( 'UI START', this.name, ctx.session.id );
	}
	
	Stop( ctx ) {
		console.log( 'UI STOP', this.name, ctx.session.id );
	}
	
	Render( ctx, connection ) {
		console.log( 'UI RENDER', this.name, connection.session.id + '/' + connection.id );
		
		ctx.Render( connection, 'ui', ( r ) => {
			
			for ( var k in this.children ) {
				var child = this.children[ k ];
				
				var m = {
					area: child.options.coords,
				};
					
				r.Style( child.style, () => {
					
					child.Render( r, m );
				
				});
			}
				
		});
	}
	
	AddChild( child ) {
		child.SetUI( this );
		this.children.push( child );
	}
	
	SetStyle( style ) {
		this.style = style;
	}
}

require( './_util' ).loadSubclasses( UI );

module.exports = UI;
