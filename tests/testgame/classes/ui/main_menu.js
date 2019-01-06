module.exports = ( X ) => {
	
	class MainMenu extends X.UI {
	
		constructor() {
			super( 'main_menu' );
			{
				this.AddAsset( new X.Asset.Image( 'main_menu_bg', __dirname + '/../../assets/images/main_menu_bg.png' ) );
				this.AddChild( new X.UI.Image({
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
				this.AddChild( block );
				
				var style = new X.UI.Style({
					block_backgroundcolor: '#000204',
					block_bordercolor: '#ddddff',
				});
				this.SetStyle( style );
			}
		}
		
	}
	
	return MainMenu;
}
