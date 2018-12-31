class Menu extends require( './_Phase' ) {
	
	constructor() {
		super();
		
		this.entries = [];
	}
	
	AddEntry( name, callback ) {
		this.entries.push({
			title: name,
			callback: callback,
		});
	}
	
	Start( session ) {
		console.log( 'MENU START', session.id );

		
	}
	
	Stop( session ) {
		console.log( 'MENU STOP', session.id );
	}
	
	Render( connection ) {
		console.log( 'MENU RENDER', connection.session.id + '/' + connection.id );
		
		var r = this.game.engine.modules.renderer;
		
		r.Render( connection, () => {
			r.Quad({
				coords: [ 10, 10, 80, 80 ],
				stroke: '#aff',
				fill: '#466',
			});
		});
	}
	
}

module.exports = Menu;
