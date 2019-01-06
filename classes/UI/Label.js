class Label extends require( './_UIElement' ) {

	Render( r, m ) {
		
		r.Text({
			coords: m.area,
			text: this.options.label,
			fill: r.style.textcolor,
			font: r.style.font,
		});
		
	}
	
}

module.exports = Label;
