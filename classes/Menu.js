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
	
	Start( ctx ) {
		ctx.AddCanvas( 'ui', new this.Canvas( 'fullscreen' ) );
		console.log( 'MENU START', ctx.session.id );
	}
	
	Stop( ctx ) {
		console.log( 'MENU STOP', ctx.session.id );
	}
	
	Render( ctx, connection ) {
		console.log( 'MENU RENDER', connection.session.id + '/' + connection.id );
		
		var r = this.game.engine.modules.renderer;
		
		r.Render( connection, () => {
			r.Canvas( ctx.canvases.ui, () => {
				
				r.Quad({
					coords: [ 10, 10, 80, 80 ],
					stroke: '#aff',
					fill: '#466',
				});
				
			});
		});
	}
	
}

module.exports = Menu;
