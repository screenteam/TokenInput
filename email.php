<?php
header( "Content-Type: text/html" ); 
header( "Content-Type: application/json" ); 
@session_start(); 
$data = &$_SESSION["data"]; 
if( !is_array($data) ){
	$data = array( "rosa@einhorn.com", "abc@def.com" );
}

// search or insert? 
if( isset( $_GET["q"] ) ){
	
	$results = array(); 
	
	if( strlen( $_GET["q"] ) == 0 ){
		for( $i = 0; $i < sizeof( $data ) && $i < 5; $i++ ){
				$results[] = "{'id': {$i}, 'email': \"" . addslashes( $data[$i] ) . "\" }"; 
		}
	}
	else{
		foreach( $data as $id => $email ){
			if( strpos( $email, $_GET["q"] ) !== false ){
				$results[] = "{'id': {$id}, 'email': \"" . addslashes( $email ) . "\" }"; 
			}
		}
	}
	
	echo "[" . implode( $results, ", " ) . "]"; 
}
else if( strlen( trim( $_GET["i"] ) ) > 0 ){
	$newEmails = array_map( "trim", split( ",", $_GET["i"] ) ); 

	// remove empty new tags... 
	for( $i = sizeof( $newEmails )-1; $i >= 0; $i-- ){
		if( strlen( $newEmails[$i] ) == 0 ){
			unset( $newEmails[$i] ); 
		}
	}
	
	$i = sizeof( $data ); 
	$results = array(); 
	foreach( $newEmails as $newEmail ){
		$pos = array_search( $newEmail, $data ); 
		if( $pos === false ){
			$data[] = $newEmail; 
			$results[] = "{'id': {$i}, 'email': \"" . addslashes( $newEmail ) . "\" }"; 
			$i ++; 
		}
		else{
			$results[] = "{'id': {$pos}, 'email': \"" . addslashes( $newEmail ) . "\" }"; 
		}
	}
	
	echo "[" . implode( $results, ", " ) . "]"; 
}