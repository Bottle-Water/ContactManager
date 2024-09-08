<?php
	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");
	if ($conn->connect_error) 
	{
		error_log("This is a custom error message.");
		returnWithError($conn->connect_error);
	} 
	else
	{
		$stmt = $conn->prepare("INSERT INTO Contacts (Name, Phone, Email, UserID, DateCreated) VALUES (?, ?, ?, ?, NOW())");
		$stmt->bind_param("ssss", $inData["name"], $inData["phone"], $inData["email"], $inData["userID"]);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithInfo();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithInfo()
	{
		$retValue = '{"message":"success"}';
		sendResultInfoAsJson($retValue);
	}
	
	function returnWithError($err)
	{
		$retValue = '{"message":"error","error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
?>
