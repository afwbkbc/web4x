window.App.Extend({
	
	renderer: {
		canvases: {},
		shapes: {},
	},
	
	StartRenderer: function() {
	},
	
	StopRenderer: function() {
		for ( var k in this.renderer.canvases )
			this.RemoveCanvas( k );
	},
	
	AddRendererShape: function( shape, obj ) {
		obj.app = this;
		this.renderer.shapes[ shape ] = obj;
	},
	
	AddCanvas: function( id, width, height ) {
		if ( this.renderer.canvases[ id ] ) {
			console.log( 'duplicate canvas id' );
			return;
		}
		var canvas = $( '<canvas id="viewport' + id + '" width="' + width + '" height="' + height + '"></canvas>' ).appendTo( $( 'body' ) );
		var ctx = canvas[ 0 ].getContext( '2d' );
		this.renderer.canvases[ id ] = {
			canvas: canvas,
			ctx: ctx,
		};
	},
	
	RemoveCanvas: function( id ) {
		if ( !this.renderer.canvases[ id ] ) {
			console.log( 'canvas not found' );
			return;
		}
		this.renderer.canvases[ id ].canvas.remove();
		delete this.renderer.canvases[ id ];
	},
	
	Draw: function( canvas, shape, parameters ) {
		if ( !this.renderer.canvases[ canvas ] ) {
			console.log( 'canvas not found' );
			return;
		}
		var obj = this.renderer.shapes[ shape ];
		if ( !obj ) {
			console.log( 'invalid shape "' + shape + '"' );
			return;
		}
		obj.Draw( this.renderer.canvases[ canvas ].ctx, parameters );
	},
	
});
