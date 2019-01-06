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
	
	Predraw: function( ctx, p ) {
		// generic shape-independent stuff before shape draw
		
		if ( p.opacity )
			ctx.globalAlpha = p.opacity;
		
		if ( p.fill )
			ctx.fillStyle = p.fill;
		if ( p.stroke )
			ctx.strokeStyle = p.stroke;
		
	},
	
	Postdraw: function( ctx, p ) {
		// generic shape-independent stuff after shape draw
		
		if ( p.opacity )
			ctx.globalAlpha = 1; // revert back
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
		var ctx = this.renderer.canvases[ canvas ].ctx;
		this.Predraw( ctx, parameters );
		obj.Draw( ctx, parameters );
		this.Postdraw( ctx, parameters );
	},
	
});
