// Generate a bunch of random sample projects
var projects = []; 
for( var i = 0; i < 1000; i++ ){
	projects[projects.length] = {
		id: i, 
		name: (Math.random() > .5? "Air ": "jQuery ") + 
		      (Math.random() > .5? "Plugin " : "Service " ) + 
		      (Math.random() > .5? "Generator " : "Extension " ) + 
		      (Math.random() > .5? "Beta " : "Manager " ), 
		date: Math.round( Math.random()*25+1 ) + "." + 
		      Math.round( Math.random()*11+1 ) + "." + 
		      Math.round( Math.random()*20+1995 )
	};
}

// Initialize the tokeninput when the document finished loading
$(document).ready( function(){
	$( "#projects" ).tokeninput( { 
		columns: [
			{ field: "name", caption: "Projekt", width: "80%" }, 
			{ field: "date", caption: "Datum", width: "20%" }
		],
		onInsert: function( obj ){
			return !$( "#insertVeto" )[0].checked
			       || confirm( "Really add " + obj.name + "?" )
		}, 
		onDelete: function( obj ){
			return !$( "#deleteVeto" )[0].checked
			       || confirm( "Really delete " + obj.name + "?" )
		}, 
		onChange: function( objects ){
			// objects contains an array of all the objects
			// however, we can also use the value of the original 
			// textfield to get the selected ids
			$( "#sel" ).text( $( "#projects" ).val() ); 
		}, 
		
		autocomplete: function( text, tokeninput ){
			if( text == "" ){
				var obj = []; 
				for( var i = 0; i < 5; i++ ){
					obj[i] = projects[i]; 
				}
				tokeninput.result( obj );
			}
			else{
				var obj = []; 
				for( var i = 0; i < projects.length && obj.length < 100; i++ ){
					// combine a few search filters
					if( Filters.contains( text, projects[i], [ "name", "date"] ) || 
						Filters.expand( text, projects[i], [ "name" ] ) ){
						
						obj[obj.length] = projects[i]; 
					}
				}
				
				tokeninput.result( obj );
			}
		},
		
		tokenText: function( obj ){
			return obj.name; 
		}, 
		
		values: [
			{ id: 9991, name: "Asteroids", date: "1.9.1979" }, 
			{ id: 9992, name: "Tetris", date: "6.6.1984" }, 
			{ id: 9993, name: "Hahnemann Game", date: "7.8.2010" }
		]
	} ); 
} ); 