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
	
	StartPhase: function() {
		console.log( 'START' );
		this.SendMessage( 'Render' );
	},
	
	StopPhase: function() {
		console.log( 'STOP' );
	},
});
