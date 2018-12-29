class Connection {
	
	constructor( web, ws, id, connection ) {
		this.web = web;
		this.ws = ws;
		this.id = id;
		this.connection = connection;
		
		console.log( 'opening connection' );
		
		var _OnMessage = ( message ) => {
			if ( message.type === 'utf8' ) {
				var message = JSON.parse( message.utf8Data );
				this.web.ProcessCommand( this, message.command, message.data );
				//console.log( 'Received Message: ' + message.utf8Data );
				//connection.sendUTF( message.utf8Data );
			}
			else if ( message.type === 'binary' ) {
				console.log( 'ws binary message' );
				//console.log( 'Received Binary Message of ' + message.binaryData.length + ' bytes' );
				//connection.sendBytes(message.binaryData);
			}
		}
		
		var _OnClose = () => {
			console.log( 'closing connection' );
			this.ws.RemoveConnection( this );
		}

		this.connection.on( 'message', _OnMessage );
		this.connection.on( 'close', _OnClose );
		
		//this.ws.ReceiveAllData( this );
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
	
	SendError( message ) {
		this.Send( 'Error', {
			message: message,
		});
	}
	
}

module.exports = Connection;
