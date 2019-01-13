window.App.Extend({
	
	events: {},
	
	AddEvents: function( events_data ) {
		var body = $( 'body' );
		
		var app = this;
		
		for ( var k in events_data ) {
			var data = events_data[ k ];
			
			var event = {
				id: data.id,
				type: data.type,
			};
			
			switch( data.type ) {
				case 'keydown':
					event.callback = function( e ) {
						app.SendMessage( 'Event', {
							id: event.id,
							key: e.key,
							code: e.keyCode,
						});
					}
					body.on( data.type, event.callback );
					console.log( 'EVENT SET', event );
					break;
				default:
					console.log( 'unknown event type "' + event.type + '"' );
					continue;
			}
			this.events[ data.id ] = event;
		}
	},
	
	RemoveEvents: function( events_data ) {
		var body = $( 'body' );
		
		console.log( 'REMOVEEVENTS', this.events );
		for ( var k in events_data ) {
			var data = events_data[ k ];
			var event = this.events[ data.id ];
			if ( !event ) {
				console.log( 'event not found' );
				continue;
			}
			body.off( event.type, event.callback );
			delete this.events[ data.id ];
		}
		console.log( 'REMOVEEVENTS', this.events );
	},
	
	ClearEvents: function() {
		this.RemoveEvents( this.events );
	},
	
});
