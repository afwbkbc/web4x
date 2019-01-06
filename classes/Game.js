class Game extends require( './_Class' ) {
	
	constructor( options ) {
		super();
		
		this.loadOptions({
			
		}, options );
		
		this.phases = {};
		this.entry_point = null;
	}
	
	AddPhase( phase ) {
		phase.game = this;
		this.phases[ phase.id ] = phase;
	}
	
	SetPhases( phases ) {
		for ( var k in phases )
			phases[ k ].game = this;
		this.phases = phases;
	}
	
	// sets entry point callback which is called for new sessions
	Start( entry_point ) {
		this.entry_point = entry_point;
	}
	
}

module.exports = Game;
