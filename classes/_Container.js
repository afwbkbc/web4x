class _Container {
	
	constructor( options ) {
		this.options = options ? options : {};
		
		this.children = [];
	}
	
	AddChild( child ) {
		this.children.push( child );
	}
}

module.exports = _Container;
