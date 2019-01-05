window.App.Extend({
	
	session: {
		id: null,
	},
	
	StartSession: function() {
		var cookie = $.cookie( 'w4xsid' );
		this.SendMessage( 'Session', cookie ? {
			id: cookie,
		} : null );
	},
	
	SetSession: function( id ) {
		$.cookie( 'w4xsid', id );
		this.session.id = id;
	},
	
	StopSession: function() {
		for ( var k in this.session )
			this.session[ k ] = null;
	},
	
});
