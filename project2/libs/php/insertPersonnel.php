<?php

	//REMOVE FOR PRODUCTION
	// ini_set('display_errors', 1);
	// error_reporting(E_ALL);
	
	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;
	}	

	$firstName = filter_var(htmlspecialchars(trim($_POST['firstname'])));
    $lastName = filter_var(htmlspecialchars(trim($_POST['lastname'])));
    $email = filter_var(htmlspecialchars(trim($_POST['email'])), FILTER_SANITIZE_EMAIL);
    $jobTitle = filter_var(htmlspecialchars(trim($_POST['jobTitle'])));
    $departmentID = $_POST['departmentID'];

	    // Validate Email Format
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$output['status']['code'] = "400";
			$output['status']['name'] = "invalid input";
			$output['status']['description'] = "Invalid email format";  
			$output['data'] = [];
	
			mysqli_close($conn);
	
			echo json_encode($output);
	
			exit;
		}
	
		// Check for required fields
		if (empty($firstName) || empty($lastName) || empty($email) || empty($jobTitle) || empty($departmentID)) {
			$output['status']['code'] = "400";
			$output['status']['name'] = "invalid input";
			$output['status']['description'] = "Missing required field(s)";  
			$output['data'] = [];
	
			mysqli_close($conn);
	
			echo json_encode($output);
	
			exit;
		}

	// Query to check if personnel exists with this firstName and lastName
	$checkQuery = $conn->prepare('SELECT COUNT(*) FROM `personnel` WHERE `firstName` = ? AND `lastName` = ?');
	$checkQuery->bind_param("ss", $firstName, $lastName);
	$checkQuery->execute();

	$checkQuery->store_result();
	$checkQuery->bind_result($count);
	$checkQuery->fetch();

	if ($checkQuery->error) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed: " . $checkQuery->error;	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 
		exit;
	}

	$checkQuery->free_result(); // Free the result to avoid 'Commands out of sync' error
	$checkQuery->close(); // Close the statement

	if ($count > 0) {

		$output['status']['code'] = "401";
		$output['status']['name'] = "unauthorised";
		$output['status']['description'] = "success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = "The person named: {$firstName} {$lastName} already exists in this database.";
		
		mysqli_close($conn);

		echo json_encode($output); 

		exit();
	} else {

	$query = $conn->prepare('INSERT INTO personnel (firstName, lastName, email, jobTitle, departmentID) VALUES (?, ?, ?, ?, ?)');
	$query->bind_param('ssssi', $firstName, $lastName, $email, $jobTitle, $departmentID);
	
	$id = $query->execute();
	
	if (false === $query) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;
	}

	$affectedRows = $query->affected_rows;
	$insertedId = $conn->insert_id;

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [
		'affectedRows' => $affectedRows,
		'insertedId' => $insertedId
	];
	mysqli_close($conn);

	echo json_encode($output); 
	}
?>