class Web extends require( './_Module' ) {
	
	Init( done ) {
		
		const port = 1337; // TMP
		
		const Twig = require( 'twig' );
		const Express = require( 'express' );
		const WebSocketServer = require( 'websocket' ).server;
		const Connection = require( './web/Connection' );
		
		Twig.cache( false );
		
		this.app = Express();
		
		const wwwroot = __dirname + '/web';
		
		this.app.set( 'views', wwwroot + '/views' );
		this.app.set( 'view engine', 'twig' )
		this.app.set( 'twig options', {
		    allow_async: true,
		    strict_variables: false
		});
		
		this.app.use( Express.static( wwwroot + '/static' ) );
		
		this.app.get( '/', ( req, res ) => {
			res.render( 'index.html.twig', {
				title: 'kek',
			});
		});
		
		var http_server = this.app.listen( port, () => {
			return done();
		});
		
		this.connections = {};
		this.connection_id = 1;
		
		this.ws = new WebSocketServer({
			httpServer : http_server,
			autoAcceptConnections: false,
		});

		this.ws.on( 'request', ( req ) => {
			var id = this.connection_id++;
			var connection = new Connection( this, id, req.accept( 'web4x', req.origin ) );
			this.connections[ id ] = connection;
		});
		
	}
	
	/*SendData( data ) {
		for ( var k in this.connections )
			this.connections[ k ].SendData( data );
	}
	
	ReceiveAllData( ws_connection ) {
		for ( var k in this.web.data_state )
			ws_connection.SendData( this.web.data_state[ k ] );
	}*/
	
	RemoveConnection( ws_connection ) {
		console.log( 'removing connection' );
		delete this.connections[ ws_connection.id ];
	}
}

module.exports = Web;
