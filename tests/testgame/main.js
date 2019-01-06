const X = require( '../../web4x' );

var engine = new X.Engine({
	http:{
		port: 1337,
	},
});

engine.Init( () => {
	
	var game = new X.Game({
		title: 'Test Game',
	});
	
	var phases = {
		main_menu: new ( require( './classes/ui/main_menu' )( X ) ),
	};
	
	game.SetPhases( phases );
	
	game.Start( ( session ) => {
		
		session.EnterPhase( phases.main_menu );
		
	});
	
	engine.SetGame( game );

	console.log( 'RUNNING...' );
	
	engine.Run();
	
});
