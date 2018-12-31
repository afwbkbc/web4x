class Game extends require( './_Class' ) {
	
	constructor( options ) {
		super();
		
		this.loadOptions({
			
		}, options );
		
		this.entry_point = null;
	}
	
	// sets phase such as menu to be run when session begins
	SetEntryPoint( phase ) {
		this.entry_point = phase;
		phase.game = this;
	}
	
}

module.exports = Game;
