class Menu extends require( './_Phase' ) {
	
	Start( session ) {
		console.log( 'MENU START', session );
	}
	
	End( session ) {
		console.log( 'MENU END', session );
	}
	
}

module.exports = Menu;
