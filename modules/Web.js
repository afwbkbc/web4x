class Web extends require( './_Module' ) {
	
	Init( done ) {
		
		const port = 1337; // TMP
		
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
		
		var http_server = this.app.listen( port, () => {
			return done();
		});
	}
	
}

module.exports = Web;
