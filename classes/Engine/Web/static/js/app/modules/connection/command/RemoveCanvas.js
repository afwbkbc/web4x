window.App.AddMessageHandler( 'RemoveCanvas', {
	
	Handle: function( data ) {
		this.app.RemoveCanvas( data.id );
	},
	
});
