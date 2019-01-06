class Button extends require( './_UIElement' ) {

	Render( r, m ) {
		
		var c = this.GetCoords( r, m );
		
		r.Quad({
			coords: c,
			stroke: r.style.button_bordercolor,
			fill: r.style.button_backgroundcolor,
		});
		
		r.Text({
			coords: c,
			text: this.options.label,
			fill: r.style.button_textcolor,
		});
		
		var event = this.ui.game.engine.modules.eventmanager.CreateEvent( 'click', {
			coords: c,
			callback: this.options.callback,
		});
		console.log( this.options );
		
	}
	
}

module.exports = Button;
