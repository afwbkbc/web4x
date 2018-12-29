window.App.Extend({
	
	Boot: function() {
		var app = this;
		
		
		app.Connect( function() { // OnOpen
			
			app.StartSession( function() {
				
				console.log( 'READY', app.session.id );
				
			});
			
		}, function() { // OnClose
			
			app.StopSession();
			
		});
		
	}
	
});
