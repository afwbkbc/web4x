class Console extends require( '../UI' ) {
	
	constructor() {
		super( 'util/console' );
		
		const Style = require( '../UI/Style' );
		const Column = require( '../UI/Column' );
		
		var container = new Column({
			coords: [ 0, 0, 959, 1079 ],
			style: new Style({
				
			}),
		});
		
		this.AddChild( container );
		
			/*this.AddChild( new X.UI.Label({
				label: 'Test game',
				style: new X.UI.Style({
					font: '80px Arial Bold',
					textcolor: 'white',
				}),
				coords: [ 1200, 60, 1680, 340 ],
			}));*/
	}
}

module.exports = Console;
