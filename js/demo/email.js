$(document).ready( function(){
	$( "#email" ).tokeninput( { 
		duplicates: false, 
		columns: [
			{ field: "email", caption: "EMail-Address", width: "100%" }
		],
		autocomplete: function( str, tokeninput ){
			$.getJSON( "email.php?q=" + str, function( data ){
				tokeninput.result( data ); 
			} ); 
		}, 
		onCreate: function( str, input ){
			$.getJSON( "email.php?i=" + str, function( data ){
				for( var i in data ){
					input.insert( data[i] ); 
				}
			} ); 
		},
		onInsert: function( obj ){
			return !$( "#insertVeto" )[0].checked
			       || confirm( "Really add " + obj.tag + "?" );
		},
		onDelete: function( obj ){
			return !$( "#deleteVeto" )[0].checked
			       || confirm( "Really delete" + obj.tag + "?" )
		}, 
		
		onChange: function( objects ){
			// objects contains an array of all the objects
			// however, we can also use the value of the original 
			// textfield to get the selected ids
			$( "#sel3" ).text( $( "#email" ).val() ); 
		},
		tokenText: function( obj ){
			return obj.email; 
		}
	} ); 
} );