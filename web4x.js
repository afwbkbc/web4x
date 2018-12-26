var classes = {};

const Fs = require( 'fs' );

var classes_dir = __dirname + '/classes';
var files = Fs.readdirSync( classes_dir );

for ( var k in files ) {
	var file = files[ k ];
	if ( file.substring( file.length - 3, file.length ) == '.js' ) {
		if ( file[0] != '_' ) {
			var name = file.substring( 0, file.length - 3 );
			classes[ name ] = require( classes_dir + '/' + name );
		}
	}
}

module.exports = classes;
