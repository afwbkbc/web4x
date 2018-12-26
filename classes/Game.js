class Game extends require( './_Class' ) {
	
	constructor( options ) {
		super();
		
		this.loadOptions({
			title: 'Unnamed game',
		}, options );
	}
	
}

module.exports = Game;
