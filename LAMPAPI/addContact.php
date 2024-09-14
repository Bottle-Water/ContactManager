<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=UTF-8");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        // Handle preflight request
        http_response_code(200);
        exit();
    }

    $inData = getRequestInfo();

    // Check if the JSON input is valid
    if ($inData === null) {
        returnWithError("Invalid JSON input");
        exit();
    }

    // Validate required fields
    if (!isset($inData["userID"]) || !isset($inData["name"]) || !isset($inData["phone"]) || !isset($inData["email"])) {
        returnWithError("Missing required fields");
        exit();
    }

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");
    
    if ($conn->connect_error) 
    {
        error_log("Connection failed: " . $conn->connect_error); // Logs the exact error
        returnWithError("Database connection failed.");
        exit();
    } 
    else
    {
        $stmt = $conn->prepare("INSERT INTO Contacts (Name, Phone, Email, UserID, DateCreated) VALUES (?, ?, ?, ?, NOW())");
        
        // Bind parameters and check if successful
        if (!$stmt) {
            returnWithError("SQL prepare failed: " . $conn->error);
            exit();
        }
        
        $stmt->bind_param("ssss", $inData["name"], $inData["phone"], $inData["email"], $inData["userID"]);
        
        if ($stmt->execute()) {
            returnWithInfo();
        } else {
            returnWithError($stmt->error);
        }

        $stmt->close();
        $conn->close();
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
