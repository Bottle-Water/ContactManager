<?php

    $inData = getRequestInfo();
    $ID = $inData["ID"];
    $userID = $inData["userID"];
    $Phone = $inData["Phone"];
    $Email = $inData["Email"];
    $Name = $inData["Name"];
    $searchResults = "";
    $searchCount = 0;

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {

        
        $stmt = $conn->prepare("UPDATE Contacts SET Phone = ?, Email = ?, Name = ?, userID = ?, WHERE ID = ?");
        if (!$stmt) {
            returnWithError($conn->error);
        } else {
            $stmt->bind_param("sssi", $Phone, $Email, $Name, $ID);

            if (!$stmt->execute()) {
                returnWithError($stmt->error);
            } else {
                if ($stmt->affected_rows === 0) {
                    returnWithError("Contact not found");
                }
                else {
                    returnWithInfo();
                }
            }

            $stmt->close();
        }
        
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
        $retValue = '{"results":"contact updated","error":""}';
        sendResultInfoAsJson( $retValue );
    }
    
?>