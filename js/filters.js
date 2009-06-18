// The filters... 
var Filters = {
	// a tiny helper function that removes all unwanted data from our object
	prepareData: function( obj, columns ){
		var result; 
		if( columns ){
			var newObj = []; 
			for( var col in columns ){
				newObj[newObj.length] = new String( obj[columns[col]] ); 
			}
			
			return newObj; 
		}
		else{
			return obj; 
		}
	}, 
	
	// converts an entire object to a lower-case object
	lowercase: function( obj ){
		for( var i in obj ){
			if( typeof( obj[i] ) == "string" ){
				obj[i] = obj[i].toLowerCase(); 
			}
		}
		
		return obj; 
	}, 
	
	// allows a data row if it contains a certain text
	// the text will be split by spaces. 
	// optionally you can pass a array of column names 
	// to prevent searching the whole dataset
	// the search is always case insensitive
	contains: function( text, obj, columns ){
		text = text.toLowerCase(); 
		var words = text.split( " " ); 
		var nrWords = words.length; 
		var foundWords = 0;
		obj = Filters.prepareData( obj, columns ); 
		obj = Filters.lowercase( obj ); 

		for( var i in obj ){
			for( var w in words ){
				// if that particular token is empty we can assume it's contained 
				// in any string. 
				// actually i find it pretty disgusting that javascript split creates
				// tokens that can consist of the deliminater. but hey... 
				if( words[w] == "" || ( words[w] && obj[i].indexOf( words[w] ) >= 0 ) ){
					words[w] = undefined; 
					foundWords ++; 
				}
			}
		}

		return foundWords == nrWords; 
	}, 
	
	// Word Expansion filter
	// This expands words from abbeviations.  
	// For instance if "Java Script Language" is in your dataset
	// it will be found if the user types "JSL". 
	// It's even smarter than that, if "Javascript Language" was in your 
	// dataset it would be found using "JSL" as well
	// This search is case insensitive as well
	expand: function( text, obj, columns ){
		// Only works if the text doesn't contain spaces! 
		if( text.match( /\s/ ) ){
			return false; 
		}
		
		text = text.toLowerCase(); 
		
		// Great, still here... make it a regexp! 
		var expression = ""; 
		for( var i = 0; i < text.length; i++ ){
			expression += text.charAt( i ) + "\\w*\\s*";
		}
		
		var regex = new RegExp( "^" + expression ); 
		
		obj = Filters.prepareData( obj, columns ); 
		obj = Filters.lowercase( obj ); 
		
		for( var i in obj ){
			if( regex.test( obj[i] ) ){
				return true; 
			}
		}
		
		return false; 
	}
}

