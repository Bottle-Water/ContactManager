<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$inData = getRequestInfo();

$firstname = $inData["FirstName"];
$lastname = $inData["LastName"];
$username = $inData["Login"];
$password = $inData["Password"];

if (empty($firstname) || empty($lastname) || empty($username) || empty($password)) {
    returnWithError("All fields are required.");
    exit();
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    // Check if the username already exists
    $stmt = $conn->prepare("SELECT ID FROM Users WHERE Login = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        returnWithError("Username already taken.");
    } else {
        // Insert the new user
        $stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $firstname, $lastname, $username, $hashed_password);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            returnWithSuccess("User created successfully.");
        } else {
            returnWithError("Error creating user.");
        }
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

function returnWithError($err)
{
    http_response_code(400); // Bad request
    $retValue = ['error' => $err];
    sendResultInfoAsJson($retValue);
}

function returnWithSuccess($message)
{
    http_response_code(200); // OK
    $retValue = ['message' => $message];
    sendResultInfoAsJson($retValue);
}
?>
