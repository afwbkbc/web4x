window.App.Extend({
	
	StartGame: function() {
		this.StartRenderer();
		this.StartSession();
	},
	
	StopGame: function() {
		this.ResetAssets();
		this.StopSession();
		this.StopRenderer();
	},
	
	StartPhase: function( phase ) {
		console.log( 'START', phase );
		this.SendMessage( 'Render', {
			phase: phase,
		});
	},
	
	StopPhase: function( phase ) {
		console.log( 'STOP', phase );
		// TODO: ?
	},
});
