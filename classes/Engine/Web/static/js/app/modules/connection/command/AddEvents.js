window.App.AddMessageHandler( 'AddEvents', {
	
	Handle: function( data ) {
		this.app.AddEvents( data.events );
	},
	
});
