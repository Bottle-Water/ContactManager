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

    // Log the received data
    error_log("Received data: " . json_encode($inData));

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
        error_log("Connection failed: " . $conn->connect_error);
        returnWithError("Database connection failed.");
        exit();
    } 
    else
    {
        $stmt = $conn->prepare("INSERT INTO Contacts (Name, Phone, Email, UserID, DateCreated) VALUES (?, ?, ?, ?, NOW())");
        
        if (!$stmt) {
            returnWithError("SQL prepare failed: " . $conn->error);
            exit();
        }
        
        $stmt->bind_param("ssss", $inData["name"], $inData["phone"], $inData["email"], $inData["userID"]);
        
        if ($stmt->execute()) {
            // Return the newly added contact data
            $newContactID = $stmt->insert_id;
            $stmt->close();

            // Fetch the newly added contact
            $stmt = $conn->prepare("SELECT * FROM Contacts WHERE ID = ?");
            $stmt->bind_param("i", $newContactID);
            $stmt->execute();
            $result = $stmt->get_result();
            $newContact = $result->fetch_assoc();

            returnWithInfo($newContact);
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
        echo json_encode($obj);
    }

    function returnWithInfo($contact)
    {
        sendResultInfoAsJson($contact);
    }

    function returnWithError($err)
    {
        http_response_code(400);
        $retValue = ['message' => 'error', 'error' => $err];
        sendResultInfoAsJson($retValue);
    }
?>
