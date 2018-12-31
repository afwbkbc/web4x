window.App.Extend({
	
	viewport: $( '<canvas id="viewport" width="1920" height="1080"></canvas>' ),
	ctx: null,
	renderer_shapes: {},
	
	StartRenderer: function() {
		$( 'body' ).html( '' ).append( this.viewport );
		this.ctx = this.viewport[0].getContext( '2d' );
	},
	
	StopRenderer: function() {
		$( 'body' ).html( '' );
		this.viewport.html( '' );
		this.ctx = null;
	},
	
	AddRendererShape: function( shape, obj ) {
		this.renderer_shapes[ shape ] = obj;
	},
	
	Draw: function( shape, parameters ) {
		if ( !this.ctx ) {
			console.log( 'renderer not running' );
			return;
		}
		var obj = this.renderer_shapes[ shape ];
		if ( !obj ) {
			console.log( 'invalid shape "' + shape + '"' );
			return;
		}
		obj.Draw( this.ctx, parameters );
	},
	
});
