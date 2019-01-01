window.App.Extend({
	
	canvases: {},
	
	renderer_shapes: {},
	
	StartRenderer: function() {
		//this.body.html( '' ).append( this.viewport );
		//this.ctx = this.viewport[0].getContext( '2d' );
	},
	
	StopRenderer: function() {
		//this.body.html( '' );
		//this.viewport.html( '' );
		//this.ctx = null;
		for ( var k in this.canvases )
			this.RemoveCanvas( k );
	},
	
	AddRendererShape: function( shape, obj ) {
		this.renderer_shapes[ shape ] = obj;
	},
	
	AddCanvas: function( id, width, height ) {
		if ( this.canvases[ id ] ) {
			console.log( 'duplicate canvas id' );
			return;
		}
		this.canvases[ id ] = $( '<canvas id="viewport' + id + '" width="' + width + '" height="' + height + '"></canvas>' );
		this.canvases[ id ].appendTo( $( 'body' ) );
	},
	
	RemoveCanvas: function( id ) {
		if ( !this.canvases[ id ] ) {
			console.log( 'canvas not found' );
			return;
		}
		this.canvases[ id ].remove();
		delete this.canvases[ id ];
	},
	
	Draw: function( canvas, shape, parameters ) {
		if ( !this.canvases[ canvas ] ) {
			console.log( 'canvas not found' );
			return;
		}
		var ctx = this.canvases[ canvas ][ 0 ].getContext( '2d' )
		var obj = this.renderer_shapes[ shape ];
		if ( !obj ) {
			console.log( 'invalid shape "' + shape + '"' );
			return;
		}
		obj.Draw( ctx, parameters );
	},
	
});
