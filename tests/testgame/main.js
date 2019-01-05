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
	
	var menu = new X.Menu( 'main_menu' );
	{
		var background = new X.Image( 'main_menu_bg', __dirname + '/assets/images/main_menu_bg.png' );
		menu.SetBackground( 'main_menu_bg' );
		menu.AddAsset( background );
		
		menu.AddEntry( 'Host game', () => {
			console.log( 'HOST GAME' );
		});
		menu.AddEntry( 'Join game', () => {
			console.log( 'JOIN GAME' );
		});
	}
	game.SetEntryPoint( menu );
	
	engine.SetGame( game );
	
	console.log( 'RUNNING...' );
	
	engine.Run( () => {
		
		console.log( 'FINISHED' );
	});
	
});
