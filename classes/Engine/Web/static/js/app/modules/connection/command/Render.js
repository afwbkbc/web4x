window.App.AddMessageHandler( 'Render', {
	
	Handle: function( data ) {
		this.app.Draw( data.canvas, data.shape, data.parameters );
	},
	
});
