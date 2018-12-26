const X = require( '../../web4x.js' );

var engine = new X.Engine({
	http:{
		port: 1337,
	},
});

engine.Init( () => {
	
	console.log( 'INIT OK' )
	
	// TODO: add games
	
	console.log( 'RUNNING...' );
	
	engine.Run( () => {
		
		console.log( 'FINISHED' );
	});
	
});
