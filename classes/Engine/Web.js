class Web extends require( './_Module' ) {
	
	Init( done ) {
		
		const Twig = require( 'twig' );
		const Express = require( 'express' );
		
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
		
		this.connections = {};
		this.connection_id = 1;
		
		return done();
		
	}
	
	RemoveConnection( ws_connection ) {
		console.log( 'removing connection' );
		delete this.connections[ ws_connection.id ];
	}

	Run( done ) {
		var http_server = this.app.listen( this.engine.options.http.port, () => {
			
			const WebSocketServer = require( 'websocket' ).server;
			const Connection = require( './web/Connection' );
			
			this.ws = new WebSocketServer({
				httpServer : http_server,
				autoAcceptConnections: false,
			});

			this.ws.on( 'request', ( req ) => {
				var id = this.connection_id++;
				var connection = new Connection( this, id, req.accept( this.engine.options.http.ws.protocol, req.origin ) );
				this.connections[ id ] = connection;
			});
			
			// TODO: when to call done?
		});
		
	}
	
}

module.exports = Web;
