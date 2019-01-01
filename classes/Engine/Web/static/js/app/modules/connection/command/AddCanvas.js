window.App.AddMessageHandler( 'AddCanvas', {
	
	Handle: function( data ) {
		this.app.AddCanvas( data.id, data.width, data.height );
	},
	
});
