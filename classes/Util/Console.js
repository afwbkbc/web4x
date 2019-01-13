class Console extends require( '../UI' ) {
	
	constructor() {
		super( 'util/console' );
		
		const Style = require( '../UI/Style' );
		const Column = require( '../UI/Column' );
		
		var container = new Column({
			coords: [ -1, -1, 1921, 539 ],
			style: new Style({
				backgroundcolor: 'black',
				bordercolor: 'lime',
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
		
		this.history = []; // global history ( session-independent ) // TODO: permissions
	}
	
	UIInit() {
		this.game.engine.modules.logger.AddLogHandler( ( text ) => {
			this._Log( text );
		});
		
		this.AddEvent( this.game.engine.modules.eventmanager.CreateEvent( 'keydown', ( data ) => {
			this._OnKeyDown( data );
		}));
	}
	
	UIStart( ctx ) {
		ctx.history = []; // local history ( session-specific )
		//console.log( 'CONSOLE START' );
	}
	
	UIStop( ctx ) {
		//console.log( 'CONSOLE STOP' );
	}
	
	UIRender( ctx, connection ) {
		console.log( 'CONSOLE RENDER', this.history );
		
	}
	
	_Log( text ) {
		this.history.push({
			datetime: new Date(),
			text: text,
		});
	}
	
	_OnKeyDown( data ) {
		console.log( 'ONKEYDOWN', data );
	}
	
}

module.exports = Console;
