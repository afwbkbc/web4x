window.App.Extend({
	
	// TODO: rewrite
	// TODO: use events
	
	Boot: function() {
		var app = this;
		
		
		app.Connect( function() { // OnOpen
			
			app.StartGame();
			
		}, function() { // OnClose
			
			app.StopGame();
			
		});
		
	},
	
});
