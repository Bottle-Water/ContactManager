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