class Web4x {
	
	constructor() {
		
		const Fs = require( 'fs' );

		var modules_dir = __dirname + '/modules';
		this.modules = {};
		var files = Fs.readdirSync( modules_dir );
		
		for ( var k in files ) {
			var file = files[ k ];
			if ( file.substring( file.length - 3, file.length ) == '.js' ) {
				if ( file[0] != '_' ) {
					var module = file.substring( 0, file.length - 3 );
					this.modules[ module.toLowerCase() ] = new ( require( modules_dir + '/' + module ) )( this );
				}
			}
		}
		
	}
	
	Init( done ) {
		
		var toload = Object.keys( this.modules ).length;
		
		var next = () => {
			toload--;
			if ( !toload )
				return done();
		}
		
		for ( var k in this.modules ) {
			var module = this.modules[ k ];
			if ( module.Init ) {
				module.Init( next );
			}
			else
				next();
		}
		
	}
	
}

module.exports = Web4x;
