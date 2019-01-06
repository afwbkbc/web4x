window.App.AddMessageHandler( 'LoadAssets', {
	
	Handle: function( data ) {
		this.app.LoadAssets( data.phase, data.assets );
	},
	
});
