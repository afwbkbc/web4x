class Menu extends require( './_Phase' ) {
	
	Start( session ) {
		console.log( 'MENU START', session.id );
	}
	
	Stop( session ) {
		console.log( 'MENU STOP', session.id );
	}
	
}

module.exports = Menu;
