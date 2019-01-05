class Engine extends require( './_Class.js' ) {
	
	constructor( options ) {
		super();
		
		this.loadModules();
		
		this.loadOptions( {
			title: 'web4x - web-based 4x strategy engine',
			http: {
				port: 80,
			},
		}, options );
		
		this.game = null;
	}
	
	Init( done ) {
		this.callModuleFunc( 'Init', done );
	}
	
	Run( done ) {
		this.callModuleFunc( 'Run', done );
	}
	
	SetGame( game ) {
		this.game = game;
		game.engine = this;
	}
	
}

module.exports = Engine;
