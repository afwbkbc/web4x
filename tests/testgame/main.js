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
		console: new X.Util.Console(),
	};
	
	game.SetPhases( phases );
	
	game.Start( ( session ) => {
		
		engine.Log( 'TEST LOG 1' );
		engine.Log( 'TEST LOG 2' );
		
		session.EnterPhase( phases.main_menu );
		//session.EnterPhase( phases.console );
		
	});
	
	engine.SetGame( game );

	console.log( 'RUNNING...' );
	
	engine.Run();
	
});
