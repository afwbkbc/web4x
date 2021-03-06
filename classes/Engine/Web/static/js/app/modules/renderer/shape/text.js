window.App.AddRendererShape( 'text', {
	
	Draw( ctx, p ) {
		
		var c = p.coords;
		
		ctx.font = p.font;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle'; 		
		
		var x = c[ 0 ] + c[ 2 ] / 2;
		var y = c[ 1 ] + c[ 3 ] / 2;
		
		y += 3; // fixes broken canvas text vertical align ( wtf? )
		
		if ( p.stroke )
			ctx.strokeText( p.text, x , y );
		
		if ( p.fill )
			ctx.fillText( p.text, x , y );
		
	}
	
});
