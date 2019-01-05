module.exports = {
	
	loadSubclasses( superclass ) {

		const Fs = require( 'fs' );

		var dir = __dirname + '/' + superclass.prototype.constructor.name;
		var files = Fs.readdirSync( dir );
		for ( var k in files ) {
			var file = files[ k ];
			if ( file.substring( file.length - 3, file.length ) == '.js' ) {
				if ( file[0] != '_' ) { // abstract classes start with _
					var subclass = file.substring( 0, file.length - 3 );
					superclass[ subclass ] = require( dir + '/' + subclass );
				}
			}
		}
		
	}
	
}
