const X = require( '../../web4x' );

var engine = new X.Engine({
	http:{
		port: 1337,
	},
});

engine.Init( () => {
	
	console.log( 'INIT OK' )
	
	var game = new ( require( './TestGame' )( X ) );
	
	/*var game = new X.Game({
		title: 'Test Game',
	});*/
	
	//engine.SetGame( game );
	
	console.log( 'RUNNING...' );
	
	engine.Run( () => {
		
		console.log( 'FINISHED' );
	});
	
});
