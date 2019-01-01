window.App.AddRendererShape( 'quad', {
	
	Draw( ctx, p ) {
		
		var c = p.coords;
		
		if ( p.fill ) {
			ctx.fillStyle = p.fill;
			ctx.fillRect( c[0], c[1], c[2], c[3] );
		}
		if ( p.stroke ) {
			ctx.strokeStyle = p.stroke;
			ctx.strokeRect( c[0], c[1], c[2], c[3] );
		}
	}
	
});
