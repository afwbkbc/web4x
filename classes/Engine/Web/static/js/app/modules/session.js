window.App.Extend({
	
	session: {
		id: null,
		cb: {
			onstart: null,
		},
	},
	
	StartSession: function( onstart ) {
		this.session.cb.onstart = onstart;
		
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
		if ( this.session.cb.onstart ) {
			var cb = this.session.cb.onstart;
			this.session.cb.onstart = null;
			cb();
		}
	},
	
	StopSession: function() {
		for ( var k in this.session )
			if ( typeof( this.session[ k ] ) !== 'object' )
				this.session[ k ] = null;
	},
	
});
