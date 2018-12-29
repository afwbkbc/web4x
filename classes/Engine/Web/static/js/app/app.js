window.App = {
	
	Extend: function( obj ) {
		for ( var k in obj ) {
			this[ k ] = obj[ k ];
		}
	},
	
};
