<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: POST, OPTIONS");
 header("Access-Control-Allow-Headers: Content-Type, Authorization");
 header("Content-Type: application/json; charset=UTF-8");

    $inData = getRequestInfo();
    $ID = $inData["ID"];
    $Phone = $inData["Phone"];
    $Email = $inData["Email"];
    $Name = $inData["Name"];

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");
    if ($conn->connect_error) 
    {
        returnWithError( $conn->connect_error );
    } 
    else
    {

        
        $stmt = $conn->prepare("UPDATE Contacts SET Name = IF(LENGTH(?) > 0, ?, Name), Phone = IF(LENGTH(?) > 0, ?, Phone), Email = IF(LENGTH(?) > 0, ?, Email) WHERE ID = ?");
        if (!$stmt) {
            returnWithError($conn->error);
        } else {
            $stmt->bind_param("ssssssi", $Name, $Name, $Phone, $Phone, $Email, $Email, $ID); // twice for the 2 times in the statement

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