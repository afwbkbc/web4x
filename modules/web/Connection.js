class Connection {
	
	constructor( ws, id, connection ) {
		this.ws = ws;
		this.id = id;
		this.connection = connection;
		
		console.log( 'opening connection' );
		
		var _OnMessage = ( message ) => {
			if ( message.type === 'utf8' ) {
				console.log( 'ws message' );
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
	
	SendData( data ) {
		this.connection.sendUTF( JSON.stringify( {
			op: 'data',
			data: data,
		} ) );
	}
	
}

module.exports = Connection;
