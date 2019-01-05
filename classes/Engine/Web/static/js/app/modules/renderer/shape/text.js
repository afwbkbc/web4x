window.App.AddRendererShape( 'text', {
	
	Draw( ctx, p ) {
		
		var c = p.coords;
		
		ctx.font = '30px Arial Bold';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle'; 		
		
		var x = c[ 0 ] + c[ 2 ] / 2;
		var y = c[ 1 ] + c[ 3 ] / 2;
		
		y += 3; // fixes broken canvas text vertical align?
		
		if ( p.stroke ) {
			ctx.strokeStyle = p.stroke;
			ctx.strokeText( p.text, x , y );
		}
		
		if ( p.fill ) {
			ctx.fillStyle = p.fill;
			ctx.fillText( p.text, x , y );
		}
		
		
		console.log( p );
		
	}
	
});
