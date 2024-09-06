<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
    {
        $contactId = $inData["contactId"];
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID = ?");
		if (!$stmt) {
			// Debugging: Log SQL prepare error
			error_log("SQL Prepare Error: " . $conn->error);
			returnWithError($conn->error);
		} else {
			$stmt->bind_param("i", $contactId);
			if (!$stmt->execute()) {
				// Debugging: Log SQL execute error
				error_log("SQL Execute Error: " . $stmt->error);
				returnWithError($stmt->error);
			} else {
				// Debugging: Log success message
				error_log("Contact deleted successfully");
				returnWithError("");
			}
			$stmt->close();
		}

		$conn->close();
        returnWithError("");
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
        $retValue = '{"id":0,"name":"","email":"","phone":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>