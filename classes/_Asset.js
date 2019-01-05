class _Asset extends require( './_Phase' ) {
	
	constructor( type, name, file_path ) {
		super();
		
		const Fs = require( 'fs' );
		const Crypto = require( 'crypto' );

		this.type = type;
		this.name = name;
		this.file_path = file_path;
		
		this.data = null;
		try {
			this.data = Fs.readFileSync( this.file_path );
		} catch ( e ) {
			console.log( 'failed to load asset "' + this.file_path + '"' );
			return;
		}
		this.hash = Crypto.createHash( 'md5' ).update( this.data ).digest( 'hex' );
		
		this.id = this.type + '/' + name + '/' + this.hash;
	}
	
	
}

module.exports = _Asset;
