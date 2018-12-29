class Web extends require( './_Module' ) {
	
	constructor( engine ) {
		super( engine );
		
		const Fs = require( 'fs' );
		
		this.commands = {};
		var command_dir = __dirname + '/Web/Command';
		var files = Fs.readdirSync( command_dir );
		
		for ( var k in files ) {
			var file = files[ k ];
			if ( file.substring( file.length - 3, file.length ) == '.js' ) {
				if ( file[0] != '_' ) { // abstract classes start with _
					var command = file.substring( 0, file.length - 3 );
					this.commands[ command ] = new ( require( command_dir + '/' + command ) )( this );
				}
			}
		}

	}
	
	Init( done ) {
		
		const Twig = require( 'twig' );
		const Express = require( 'express' );
		
		Twig.cache( false );
		
		this.app = Express();
		
		const wwwroot = __dirname + '/Web';
		
		this.app.set( 'views', wwwroot + '/views' );
		this.app.set( 'view engine', 'twig' )
		this.app.set( 'twig options', {
		    allow_async: true,
		    strict_variables: false
		});
		
		this.app.use( Express.static( wwwroot + '/static' ) );
		
		this.app.get( '/', ( req, res ) => {
			res.render( 'index.html.twig', {
				title: this.engine.options.title,
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
		var that = this;
		
		var http_server = this.app.listen( this.engine.options.http.port, () => {
			
			const WebSocketServer = require( 'websocket' ).server;
			const Connection = require( './Web/Connection' );
			
			this.ws = new WebSocketServer({
				httpServer : http_server,
				autoAcceptConnections: false,
			});

			this.ws.on( 'request', ( req ) => {
				var id = this.connection_id++;
				var connection = new Connection( that, this, id, req.accept( 'web4x', req.origin ) );
				this.connections[ id ] = connection;
			});
			
			// TODO: when to call done?
		});
		
	}
	
	ProcessCommand( connection, command, data ) {
		if ( !this.commands[ command ] )
			connection.SendError( 'Invalid command "' + command + '"' );
		else {
			this.commands[ command ].Execute( connection, data );
		}
	}
}

module.exports = Web;
