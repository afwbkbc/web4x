window.App.Extend({

	AddStatus: function( status ) {
		// TODO: improve
		$( 'html title' ).html( '(' + status + ') ' + $( 'html title' ).html().replace( '(' + status + ') ', '' ) );
	},
	
	RemoveStatus: function( status ) {
		// TODO: improve
		$( 'html title' ).html( $( 'html title' ).html().replace( '(' + status + ') ', '' ) );
	},
	
});
