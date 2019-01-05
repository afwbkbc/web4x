class Menu extends require( './_Phase' ) {
	
	constructor( name ) {
		super( 'menu/' + name );
		
		this.entries = [];
		this.background = null;
	}
	
	AddEntry( name, callback ) {
		this.entries.push({
			title: name,
			callback: callback,
		});
	}
	
	SetBackground( asset_name ) {
		this.background = asset_name;
	}
	
	Start( ctx ) {
		ctx.AddCanvas( 'ui', new this.Canvas( 'fullscreen' ) );
		console.log( 'MENU START', ctx.session.id );
	}
	
	Stop( ctx ) {
		console.log( 'MENU STOP', ctx.session.id );
	}
	
	Render( ctx, connection ) {
		console.log( 'MENU RENDER', connection.session.id + '/' + connection.id );
		
		ctx.Render( connection, 'ui', ( r ) => {
			
			r.Quad({
				coords: [ 10, 10, 80, 80 ],
				stroke: '#aff',
				fill: '#466',
			});
			
		});
	}
	
}

module.exports = Menu;
