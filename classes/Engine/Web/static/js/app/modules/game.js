window.App.Extend({
	
	StartGame() {
		//console.log( 'START' );
		this.StartRenderer();
		this.SendMessage( 'RunPhase' );
	},
	
	StopGame() {
		//console.log( 'STOP' );
		this.StopRenderer();
	},
	
});
