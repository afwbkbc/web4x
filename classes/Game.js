class Game extends require( './_Class' ) {
	
	constructor( options ) {
		super();
		
		this.loadOptions({
			
		}, options );
		
		this.phases = {};
		this.entry_point = null;
	}
	
	AddPhase( phase ) {
		this.phases[ phase.name ] = phase;
		phase.game = this;
		if ( this.engine )
			phase.Init( this.engine );
	}
	
	SetPhases( phases ) {
		this.phases = phases;
		for ( var k in phases ) {
			var phase = phases[ k ];
			phase.game = this;
			if ( this.engine )
				phase.Init( this.engine );
		}
	}
	
	// sets entry point callback which is called for new sessions
	Start( entry_point ) {
		this.entry_point = entry_point;
	}

	Init( engine ) {
		this.engine = engine;
		for ( var k in this.phases )
			this.phases[ k ].Init( engine );
	}

}

module.exports = Game;
