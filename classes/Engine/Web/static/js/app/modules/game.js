window.App.Extend({
	
	StartGame() {
		//console.log( 'START' );
		this.StartRenderer();
		this.SendMessage( 'Render' );
	},
	
	StopGame() {
		//console.log( 'STOP' );
		this.StopRenderer();
	},
	
});
