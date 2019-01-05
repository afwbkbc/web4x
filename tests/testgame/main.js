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
			menu.AddAsset( new X.Asset.Image( 'main_menu_bg', __dirname + '/assets/images/main_menu_bg.png' ) );
			menu.AddChild( new X.UI.Image({
				id: 'main_menu_bg',
				coords: [ 0, 0, 1919, 1079 ],
			}));
			
			var block = new X.UI.Column({
				coords: [ 1500, 400, 1760, 860 ],
			});
			{
				block.AddChild( new X.UI.Button({
					label: 'Host game',
					callback: () => {
						console.log( 'HOST GAME PRESSED' );
					},
				}));
				block.AddChild( new X.UI.Button({
					label: 'Join game',
					callback: () => {
						console.log( 'JOIN GAME PRESSED' );
					},
				}));
				block.AddChild( new X.UI.Button({
					label: 'Options',
					callback: () => {
						console.log( 'OPTIONS PRESSED' );
					},
				}));
				block.AddChild( new X.UI.Button({
					label: 'Credits',
					callback: () => {
						console.log( 'CREDITS PRESSED' );
					},
				}));
				block.AddChild( new X.UI.Button({
					label: 'Quit',
					callback: () => {
						console.log( 'QUIT PRESSED' );
					},
				}));
			}
			menu.AddChild( block );
		
			var style = new X.UI.Style({
				block_backgroundcolor: '#000204',
				block_bordercolor: '#ddddff',
			});
			menu.SetStyle( style );
		}
		game.SetEntryPoint( menu );
	}
	engine.SetGame( game );
	
	console.log( 'RUNNING...' );
	
	engine.Run();
	
});
