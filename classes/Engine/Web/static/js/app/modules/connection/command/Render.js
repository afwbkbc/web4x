window.App.AddMessageHandler( 'Render', {
	
	Handle: function( data ) {
		this.app.Draw( data.shape, data.parameters );
	},
	
});
