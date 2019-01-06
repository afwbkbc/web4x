class Button extends require( './_UIElement' ) {

	Render( r, m ) {
		
		var c = Object.assign( {}, m.area );
		c[ 0 ] += r.style.button_margin_x * ( m.first_x ? 1 : 0.5 );
		c[ 1 ] += r.style.button_margin_y * ( m.first_y ? 1 : 0.5 );
		c[ 2 ] -= r.style.button_margin_x * ( m.last_x ? 1 : 0.5 );
		c[ 3 ] -= r.style.button_margin_y * ( m.last_y ? 1 : 0.5 );
		
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
			font: r.style.button_font,
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
