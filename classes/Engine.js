class Engine extends require( './_Class.js' ) {
	
	constructor( options ) {
		super();
		
		// default options
		this.options = {
			http: {
				port: 80,
				ws: {
					protocol: 'web4x',
				},
			},
		}
		
		// add custom options
		if ( options )
			this.options = require( 'deepmerge' )( this.options, options );
	}
	
	Init( done ) {
		this.callModuleFunc( 'Init', done );
	}
	
	Run( done ) {
		this.callModuleFunc( 'Run', done );
	}
	
}

module.exports = Engine;
