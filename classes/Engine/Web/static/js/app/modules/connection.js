window.App.Extend({

	connection: {
		reconnect_timeout: 1000,
		reconnect_timeout_rand: 500, // because
		reconnect_timeout_max: 10000,
		socket: null,
		reconnect: {
			timer: null,
			timeout: null,
		},
		
		OnOpen: function( that ) {
			window.App.RemoveStatus( 'OFFLINE' );
			this.reconnect.timeout = null;
			if ( this.cb.onopen )
				this.cb.onopen();
		},
		
		OnClose: function( that ) {
			if ( !this.socket ) {
				console.log( 'not connected' );
				return;
			}
			window.App.AddStatus( 'OFFLINE' );
			this.socket = null;
			console.log( 'disconnected' );
			if ( this.cb.onclose )
				this.cb.onclose();
			that.Reconnect();
		},
	
		OnMessage: function( that, e ) {
			var data = JSON.parse( e.data );
			if ( !that.message_handlers[ data.command ] ) {
				console.log( 'no message handler for "' + data.command + '"' );
				return;
			}
			that.message_handlers[ data.command ].Handle( data.data );
		},
		
		cb: {
			onopen: null,
			onclose: null,
		},
	},
	
	Connect: function( onopen, onclose ) {
		var c = this.connection;
		if ( c.socket ) {
			console.log( 'websocket already active' );
			return;
		}
		c.cb.onopen = onopen;
		c.cb.onclose = onclose;
		c.socket = new WebSocket( 'ws://' + window.location.host, [ 'web4x' ] );
		var that = this;
		c.socket.onopen = function() { c.OnOpen( that ) };
		c.socket.onclose = function() { c.OnClose( that ) };
		c.socket.onmessage = function( e ) { c.OnMessage( that, e ) };
	},
	
	Reconnect: function() {
		var c = this.connection;
		if ( c.socket ) {
			console.log( 'already connected' );
			return;
		}
		if ( c.reconnect.timer ) {
			console.log( 'already reconnecting' );
			return;
		}
		if ( !c.reconnect.timeout ) // first reconnect
			c.reconnect.timeout = c.reconnect_timeout;
		else { // consecutive reconnects, need to avoid builting flood protection
			c.reconnect.timeout += c.reconnect_timeout;
			if ( c.reconnect.timeout > c.reconnect_timeout_max )
				c.reconnect.timeout = c.reconnect_timeout_max;
		}
		console.log( 'reconnecting in ' + c.reconnect.timeout + 'ms' );
		var that = this;
		c.reconnect.timer = setTimeout( function() {
			c.reconnect.timer = null;
			that.Connect( c.cb.onopen, c.cb.onclose );
		}, c.reconnect.timeout + Math.random( c.reconnect_timeout_rand ) - c.reconnect_timeout_rand / 2 );
		
	},
	
	SendMessage: function( command, data ) {
		var c = this.connection;
		if ( !c.socket ) {
			console.log( 'unable to send, connection offline' );
			return;
		}
		c.socket.send( JSON.stringify( {
			command: command,
			data: data,
		} ) );
	},
	
	message_handlers: {},
	
	AddMessageHandler: function( command, obj ) {
		obj.app = this;
		this.message_handlers[ command ] = obj;
	},
	
});
