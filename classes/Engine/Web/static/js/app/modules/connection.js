window.App.modules.connection = {
	
	reconnect_timeout: 1000,
	reconnect_timeout_max: 10000,
	
	Init: function() {
		this.socket = null;
		this.reconnect = {
			timer: null,
			timeout: null,
		};
	},
	
	Start: function() {
		this.Connect();
	},
	
	OnOpen: function() {
		window.App.RemoveStatus( 'OFFLINE' );
		console.log( 'connected' );
	},
	
	OnClose: function() {
		if ( !this.socket ) {
			console.log( 'not connected' );
			return;
		}
		window.App.AddStatus( 'OFFLINE' );
		this.socket = null;
		console.log( 'disconnected' );
		this.Reconnect();
	},
	
	OnMessage: function( e ) {
		console.log( 'ONMESSAGE', e );
	},
	
	Connect: function() {
		if ( this.socket ) {
			console.log( 'websocket already active' );
			return;
		}
		this.socket = new WebSocket( 'ws://' + window.location.host, [ 'web4x' ] );
		var c = this;
		this.socket.onopen = function() { c.OnOpen() };
		this.socket.onclose = function() { c.OnClose() };
		this.socket.onmessage = function( e ) { c.OnMessage( e ) };
	},
	
	Reconnect: function() {
		if ( this.socket ) {
			console.log( 'already connected' );
			return;
		}
		if ( this.reconnect.timer ) {
			console.log( 'already reconnecting' );
			return;
		}
		if ( !this.reconnect.timeout ) // first reconnect
			this.reconnect.timeout = this.reconnect_timeout;
		else { // consecutive reconnects, need to avoid builting flood protection
			this.reconnect.timeout += this.reconnect_timeout;
			if ( this.reconnect.timeout > this.reconnect_timeout_max )
				this.reconnect.timeout = this.reconnect_timeout_max;
		}
		console.log( 'reconnecting in ' + this.reconnect.timeout + 'ms' );
		var that = this;
		this.reconnect.timer = setTimeout( function() {
			that.reconnect.timer = null;
			that.Connect();
		}, this.reconnect.timeout );
		
	}
	
}
