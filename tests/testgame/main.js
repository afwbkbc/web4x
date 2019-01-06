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
	{
		var menu = new ( require( './classes/ui/main_menu' )( X ) );
		game.SetEntryPoint( menu );
	}
	engine.SetGame( game );
	
	console.log( 'RUNNING...' );
	
	engine.Run();
	
});
