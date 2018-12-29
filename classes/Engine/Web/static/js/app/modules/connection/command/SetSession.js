window.App.AddMessageHandler( 'SetSession', {
	
	Handle: function( data ) {
		this.app.SetSession( data.id );
	},
	
});
