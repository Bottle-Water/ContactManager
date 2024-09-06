<?php
	$inData = getRequestInfo();
	
	$username = $inData["username"];
	$email = $inData["email"];
	$password = $inData["password"];

	$hashed_password = password_hash($password, PASSWORD_DEFAULT);

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into users (username, email, password) VALUES(?, ?, ?)");
		$stmt->bind_param("sss", $username, $email, $hashed_password);
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