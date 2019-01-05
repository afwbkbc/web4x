class _Class {
	
	constructor() {
		this.Fs = require( 'fs' );
		this.DeepMerge = require( 'deepmerge' );
		
		this.class_name = this.constructor.name;
		
	}
	
	loadModules() {
		this.modules = {};

		// load js modules into this.modules if corresponding directory exists
		var modules_dir = __dirname + '/' + this.class_name;
		var has_modules = true;
		try {
			this.Fs.statSync( modules_dir );
		} catch( e ) {
			has_modules = false;
		} 
		if ( has_modules ) {
			var files = this.Fs.readdirSync( modules_dir );
			
			for ( var k in files ) {
				var file = files[ k ];
				if ( file.substring( file.length - 3, file.length ) == '.js' ) {
					if ( file[0] != '_' ) { // abstract classes start with _
						var module = file.substring( 0, file.length - 3 );
						this.modules[ module.toLowerCase() ] = new ( require( modules_dir + '/' + module ) )( this );
					}
				}
			}
		}
	}
	
	// asyncroniously iterate through all modules and call function with corresponding name if exists
	// then call done()
	callModuleFunc( func_name, done ) {
		
		var torun = Object.keys( this.modules ).length;
		
		var next = () => {
			if ( !--torun )
				return done();
		}
		
		for ( var k in this.modules ) {
			var module = this.modules[ k ];
			if ( module[ func_name ] )
				module[ func_name ]( next );
			else
				next();
		}

	}
	
	loadOptions( defaults, options ) {
		this.options = options ? this.DeepMerge( defaults, options ) : defaults;
	}
	
}

module.exports = _Class;
