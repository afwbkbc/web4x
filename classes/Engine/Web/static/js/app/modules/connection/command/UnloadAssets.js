window.App.AddMessageHandler( 'UnloadAssets', {
	
	Handle: function( data ) {
		this.app.UnloadAssets( data.phase, data.assets );
	},
	
});
