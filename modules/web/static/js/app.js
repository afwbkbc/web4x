$( document ).ready( function() {

	var socket = null;
	
	var reconnect_timeout = null;
	var tryconnect = function() {
		
		reconnect_timeout = null;
		
		socket = new WebSocket( 'ws://' + window.location.host, [ 'web4x' ] );
		socket.onopen = function() {
			if ( reconnect_timeout ) {
				clearTimeout( reconnect_timeout );
				reconnect_timeout = null;
			}
			console.log( 'OPEN' );
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
