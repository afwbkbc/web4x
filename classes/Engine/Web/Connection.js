class Connection {
	
	constructor( web, ws, id, connection ) {
		this.web = web;
		this.ws = ws;
		this.id = id;
		this.connection = connection;
		this.session = null;
		
		console.log( 'opening connection' );
		
		var _OnMessage = ( message ) => {
			if ( message.type === 'utf8' ) {
				var message = JSON.parse( message.utf8Data );
				this.web.ProcessCommand( this, message.command, message.data );
			}
			else if ( message.type === 'binary' ) {
				console.log( 'ws binary message' );
				//console.log( 'Received Binary Message of ' + message.binaryData.length + ' bytes' );
				//connection.sendBytes(message.binaryData);
			}
		}
		
		var _OnClose = () => {
			console.log( 'closing connection' );
			if ( this.session ) {
				this.session.RemoveConnection( this );
				this.session = null;
			}
			this.ws.RemoveConnection( this );
		}

		this.connection.on( 'message', _OnMessage );
		this.connection.on( 'close', _OnClose );
	}
	
	Log( text ) {
		this.ws.Log( '[ws/' + this.id + '] ' + text );
	}
	
	Send( command, data ) {
		this.connection.sendUTF( JSON.stringify( {
			command: command,
			data: data,
		} ) );
	}
	
	SendData( buffer ) {
		this.connection.sendBytes( buffer );
	}
	
	SendError( message ) {
		this.Send( 'Error', {
			message: message,
		});
	}
	
}

module.exports = Connection;
