window.App.Extend({
	
	Boot: function() {
		var app = this;
		
		
		app.Connect( function() { // OnOpen
			
			app.StartSession( function() {
				
				app.StartGame();
				
			});
			
		}, function() { // OnClose
			
			app.StopGame();
			app.StopSession();
			
		});
		
	},
	
});
