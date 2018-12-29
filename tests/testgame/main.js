const X = require( '../../web4x' );

var engine = new X.Engine({
	http:{
		port: 1337,
	},
});

engine.Init( () => {
	
	console.log( 'INIT OK' )
	
	var game = new X.Game({
		title: 'Test Game',
	});
	
	var menu = new X.Menu({
		'Host game': () => {
			console.log( 'HOST GAME' );
		},
		'Join game': () => {
			console.log( 'JOIN GAME' );
		},
	});
	
	game.SetEntryPoint( menu );
	
	engine.SetGame( game );
	
	console.log( 'RUNNING...' );
	
	engine.Run( () => {
		
		console.log( 'FINISHED' );
	});
	
});
