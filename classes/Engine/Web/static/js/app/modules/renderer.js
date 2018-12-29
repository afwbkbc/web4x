window.App.Extend({
	
	viewport: $( '<canvas id="viewport"></canvas>' ),
	
	StartRenderer: function() {
		$( 'body' ).html( '' ).append( this.viewport );
	},
	
	StopRenderer: function() {
		$( 'body' ).html( '' );
	},
	
});
