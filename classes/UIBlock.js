class UIBlock extends require( './_Container' ) {
	
	constructor( options ) {
		super( options );
		
	}
	
	AddButton( text, callback ) {
		this.AddChild({
			type: 'button',
			text: text,
			callback: callback,
		});
	}
	
}

module.exports = UIBlock;
