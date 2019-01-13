class UI extends require( './_Phase' ) {
	
	constructor( name ) {
		super( 'ui/' + name );
		
		this.style = new ( require( './UI/Style' ) );
		
		this.children = [];
		this.events = {};
	}
	
	// override these if needed
	UIInit() {}
	UIStart( ctx ) {}
	UIStop( ctx ) {}
	UIRender( ctx, connection ) {}
	
	InitPhase() {

		this.UIInit();
	}
	
	Start( ctx ) {
		console.log( 'UI START', this.name, ctx.session.id );
		ctx.AddCanvas( 'ui', new this.Canvas( 'fullscreen' ) );
		ctx.AddEvents( this.events );
		this.UIStart( ctx );
	}
	
	Stop( ctx ) {
		ctx.RemoveEvents( this.events );
		this.UIStop( ctx );
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
		
		this.UIRender( ctx, connection );
	}
	
	SetStyle( style ) {
		this.style = style;
	}
	
	AddChild( child ) {
		child.SetUI( this );
		this.children.push( child );
	}
	
	AddEvent( event ) {
		this.events[ event.id ] = event;
		console.log( 'E', this.events );
	}
}

require( './_util' ).loadSubclasses( UI );

module.exports = UI;
