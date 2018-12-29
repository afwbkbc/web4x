window.App.modules.state = {

	Init: function() {
		
		window.App.AddStatus = this.AddStatus;
		window.App.RemoveStatus = this.RemoveStatus;
	},

	AddStatus: function( status ) {
		// TODO: improve
		$( 'html title' ).html( '(' + status + ') ' + $( 'html title' ).html().replace( '(' + status + ') ', '' ) );
	},
	
	RemoveStatus: function( status ) {
		// TODO: improve
		$( 'html title' ).html( $( 'html title' ).html().replace( '(' + status + ') ', '' ) );
	},
	
}