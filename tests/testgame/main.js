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
		var menu = new X.UI( 'main_menu' );
		{
			var background = new X.Image( 'main_menu_bg', __dirname + '/assets/images/main_menu_bg.png' );
			menu.SetBackground( 'main_menu_bg' );
			menu.AddAsset( background );
			
			var block = new X.UIBlock({
				coords: [ 1500, 400, 1760, 860 ],
			});
			{
				block.AddButton( 'Host game', () => {
					console.log( 'HOST GAME PRESSED' );
				});
				block.AddButton( 'Join game', () => {
					console.log( 'JOIN GAME PRESSED' );
				});
			}
			menu.AddBlock( block );
		
			var style = new X.UIStyle({
				menu_block_backgroundcolor: '#000204',
				menu_block_bordercolor: '#ddddff',
			});
			menu.SetStyle( style );
		}
		game.SetEntryPoint( menu );
	}
	engine.SetGame( game );
	
	console.log( 'RUNNING...' );
	
	engine.Run();
	
});
