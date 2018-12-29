window.App = {
	
	modules: {},
	
	Init: function() {
		for ( var k in this.modules )
			if ( this.modules[ k ].Init )
				this.modules[ k ].Init();
	},
	
	Start: function() {
		for ( var k in this.modules )
			if ( this.modules[ k ].Start )
				this.modules[ k ].Start();
	}
	
};
