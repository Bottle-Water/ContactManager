<?php
	$inData = getRequestInfo();
	
	$username = $inData["username"];
	$password = $inData["password"];

	$hashed_password = password_hash($password, PASSWORD_DEFAULT);

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into users (username, password) VALUES(?, ?)");
		$stmt->bind_param("ss", $username, $hashed_password);
		$stmt->execute();
	
		if ($stmt->affected_rows > 0) {
			returnWithSuccess("User created successfully.");
		} else {
			returnWithError("Error creating user.");
		}		

		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithSuccess( $message )
	{
		$retValue = '{"message":"' . $message . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
