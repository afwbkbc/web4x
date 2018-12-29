window.App.AddMessageHandler( 'Error', {
	
	Handle: function( data ) {
		console.log( 'SERVER ERROR: ' + data.message );
	},
	
});
