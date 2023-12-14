<?php

	//REMOVE FOR PRODUCTION
	// ini_set('display_errors', 1);
	// error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	// Check for connection error
	if ($conn->connect_errno) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "failed";
		$output['status']['description'] = "Failed to connect to database: " . $conn->connect_error;
		$output['data'] = [];

		mysqli_close($conn);
		echo json_encode($output);
		exit;
	}

	$name = htmlspecialchars(trim($_POST['name']));
	$locationID = trim($_POST['locationID']);
    $id = $_POST['id'];

	// Validate input
    if (empty($name) || empty($locationID) || empty($id)) {
        $output['status']['code'] = "400";
        $output['status']['name'] = "invalid input";
        $output['status']['description'] = "Missing required field(s)";  
        $output['data'] = [];

        mysqli_close($conn);

        echo json_encode($output);

        exit;
    }
	
	$query = $conn->prepare('UPDATE department SET name=?, locationID=? WHERE id=?');

	// Check for SQL preparation error
	if (!$query) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "failed";
		$output['status']['description'] = "Failed to prepare statement: " . $conn->error;
		$output['data'] = [];

		mysqli_close($conn);
		echo json_encode($output);
		exit;
	}

	// Bind parameters
	if (!$query->bind_param('sii', $name, $locationID, $id)) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "failed";
		$output['status']['description'] = "Failed to bind parameters: " . $query->error;
		$output['data'] = [];

		mysqli_close($conn);
		echo json_encode($output);
		exit;
	}

	// Execute statement
	if (!$query->execute()) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "failed";
		$output['status']['description'] = "Failed to execute statement: " . $query->error;
		$output['data'] = [];

		mysqli_close($conn);
		echo json_encode($output);
		exit;
	}

	// Prepare output
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "Success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) * 1000 . " ms";
	$output['data'] = [];

	mysqli_close($conn);
	echo json_encode($output);