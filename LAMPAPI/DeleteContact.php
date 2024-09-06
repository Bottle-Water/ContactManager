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
        $ID = $inData["ID"];
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID = ?");
        if (!$stmt) {
            returnWithError($conn->error);
        } else {
            $stmt->bind_param("i", $ID);

            if (!$stmt->execute()) {
                returnWithError($stmt->error);
            }

            $stmt->close();
        }
        returnWithInfo()
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
	
	function returnWithInfo( )
	{
		$retValue = '{"results":"contact deleted","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>