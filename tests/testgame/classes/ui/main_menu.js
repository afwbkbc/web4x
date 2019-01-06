module.exports = ( X ) => {
	
	class MainMenu extends X.UI {
	
		constructor() {
			super( 'main_menu' );
			{
				
				var style = new X.UI.Style({
					block_backgroundcolor: '#000204',
					block_bordercolor: '#ddddff',
					button_backgroundcolor: '#090709',
					button_bordercolor: '#eeeeee',
					button_textcolor: 'white',
					button_opacity: 0.7,
				});
				this.SetStyle( style );
				
				this.AddAsset( new X.Asset.Image( 'main_menu_bg', __dirname + '/../../assets/images/main_menu_bg.png' ) );
				this.AddChild( new X.UI.Image({
					id: 'main_menu_bg',
					coords: [ 0, 0, 1919, 1079 ],
				}));
				
				this.AddChild( new X.UI.Label({
					label: 'Test game',
					style: new X.UI.Style({
						font: '80px Arial Bold',
						textcolor: 'white',
					}),
					coords: [ 1200, 60, 1680, 340 ],
				}));
				
				var block = new X.UI.Column({
					coords: [ 1500, 460, 1760, 920 ],
				});
				{
					block.AddChild( new X.UI.Button({
						label: 'Host game',
						style: new X.UI.Style({
							button_backgroundcolor: '#061708',
						}),
						callback: () => {
							console.log( 'HOST GAME PRESSED' );
						},
					}));
					block.AddChild( new X.UI.Button({
						label: 'Join game',
						style: new X.UI.Style({
							button_backgroundcolor: '#061708',
						}),
						callback: () => {
							console.log( 'JOIN GAME PRESSED' );
						},
					}));
					block.AddChild( new X.UI.Button({
						label: 'Options',
						style: new X.UI.Style({
							button_backgroundcolor: '#121004',
						}),
						callback: () => {
							console.log( 'OPTIONS PRESSED' );
						},
					}));
					block.AddChild( new X.UI.Button({
						label: 'Credits',
						style: new X.UI.Style({
							button_backgroundcolor: '#0a0a0a',
						}),
						callback: () => {
							console.log( 'CREDITS PRESSED' );
						},
					}));
					block.AddChild( new X.UI.Button({
						label: 'Quit',
						style: new X.UI.Style({
							button_backgroundcolor: '#170808',
						}),
						callback: () => {
							console.log( 'QUIT PRESSED' );
						},
					}));
				}
				this.AddChild( block );
				
			}
		}
		
	}
	
	return MainMenu;
}
