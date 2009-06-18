$(document).ready( function(){
	$( "#tags" ).tokeninput( { 
		onCreate: function( str, tokeninput ){
			var tokens = str.split( "," ); 
			for( var i in tokens ){
				tokeninput.insert( { id: tokens[i].replace( /^\s*(.*?)\s*$/, "$1" ) } ); 
			}
		}, 
		onInsert: function( obj ){
			return !$( "#insertVeto" )[0].checked
			       || confirm( "Really add " + obj.id + "?" )
		},
		onDelete: function( obj ){
			return !$( "#deleteVeto" )[0].checked
			       || confirm( "Really delete " + obj.id + "?" )
		}, 
		onChange: function( objects ){
			// objects contains an array of all the objects
			// however, we can also use the value of the original 
			// textfield to get the selected ids
			$( "#sel2" ).text( $( "#tags" ).val() ); 
		}
	} ); 
} );