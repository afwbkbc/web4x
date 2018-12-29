$( document ).ready( function() {

	var socket = null;
	
	var reconnect_timeout = null;
	var tryconnect = function() {
		
		reconnect_timeout = null;
		
		socket = new WebSocket( 'ws://' + window.location.host, [ 'web4x' ] );
		
		var sendmsg = function( command, data ) {
			socket.send( JSON.stringify( {
				command: command,
				data: data,
			} ) );
		}
		
		socket.onopen = function() {
			if ( reconnect_timeout ) {
				clearTimeout( reconnect_timeout );
				reconnect_timeout = null;
			}
			console.log( 'OPEN' );
			var session_cookie = $.cookie( 'web4x' );
			if ( typeof( session_cookie ) === 'undefined' ) {
				sendmsg( 'NewSession' );
			}
		};
		
		socket.onclose = function() {
			console.log( 'CLOSE' );
			if ( !reconnect_timeout ) {
				reconnect_timeout = setTimeout( tryconnect, 1000 );
			}
		}
		
		socket.onmessage = function( e ) {
			console.log( 'MESSAGE', e.data );
		}
	}
	tryconnect();
	
});
