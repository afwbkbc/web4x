class Button extends require( './_UIElement' ) {

	Render( r, m ) {
		
		var c = this.GetCoords( r, m );
		
		r.Quad({
			coords: c,
			stroke: r.style.button_bordercolor,
			fill: r.style.button_backgroundcolor,
			opacity: r.style.button_opacity,
		});
		
		r.Text({
			coords: c,
			text: this.options.label,
			fill: r.style.button_textcolor,
			opacity: r.style.button_opacity,
		});
		
		var event = this.ui.game.engine.modules.eventmanager.CreateEvent( 'click', {
			coords: c,
			callback: this.options.callback,
		});
		//console.log( this.options ); // TODO
		
	}
	
}

module.exports = Button;
