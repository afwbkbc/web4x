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
		
		const Fs = require( 'fs' );
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
		
		var static_dir = wwwroot + '/static';
		this.app.use( Express.static( static_dir ) );
		
		var get_scripts = ( dir ) => {
			var scripts = [];
			var path = static_dir + dir;
			var files = Fs.readdirSync( path );
			
			var loop_files = ( loop_directories ) => {
				for ( var k in files ) {
					var file = files[ k ];
					var file_path = path + '/' + file;
					
					if ( Fs.lstatSync( file_path ).isDirectory() && loop_directories ) {
						scripts = scripts.concat( get_scripts( dir + '/' + file ) );
					}
					else if ( !loop_directories ) {
						if ( file.substring( file.length - 3, file.length ) == '.js' )
							scripts.push( dir + '/' + file );
					}
				}
			}
			loop_files( false );
			loop_files( true );
			
			return scripts;
		}
		
		var scripts = get_scripts( '/js' );
		
		this.app.get( '/', ( req, res ) => {
			res.render( 'index.html.twig', {
				title: this.engine.options.title,
				scripts:scripts,
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
