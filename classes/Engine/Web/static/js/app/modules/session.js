window.App.Extend({
	
	session: {
		id: null,
	},
	
	StartSession: function( onstart ) {
		console.log( 'STARTSESSION' );
		
		var cookie = $.cookie( 'w4xsid' );
		if ( !cookie ) {
			this.SendMessage( 'NewSession' );
		}
		else {
			this.SendMessage( 'SetSession', {
				id: cookie,
			});
		}
	},
	
	SetSession: function( id ) {
		$.cookie( 'w4xsid', id );
		this.session.id = id;
		console.log( 'SESSION', id );
	},
	
	StopSession: function() {
		console.log( 'STOPSESSION' );
		for ( var k in this.session )
			this.session[ k ] = null;
	},
	
});
