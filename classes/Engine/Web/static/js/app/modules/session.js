window.App.Extend({
	
	session: {
		id: null,
	},
	
	StartSession: function( onstart ) {
		console.log( 'STARTSESSION' );
		
		var cookie = $.cookie( 'w4xsid' );
		if ( !cookie ) {
			console.log( 'NEWSESSION' );
			this.SendMessage( 'NewSession' );
		}
		else {
			console.log( 'SESSION', cookie );
		}
	},
	
	StopSession: function() {
		console.log( 'STOPSESSION' );
		for ( var k in this.session )
			this.session[ k ] = null;
	},
	
});
