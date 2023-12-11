<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/insertDepartment.php?name=New%20Department&locationID=<id>

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
	
	// this includes the login details
	
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

	
	$name = htmlspecialchars(trim($_POST['departmentName']));
	$locationID = $_POST['locationID'];

	// Validate input
	if (!$name) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "invalid input";
		$output['status']['description'] = "Invalid Department name";  
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;
	}

	// Query to check if departments exists with this location
	$checkQuery = $conn->prepare('SELECT COUNT(*) FROM `department` WHERE `name` = ? and `locationID` = ?');
	$checkQuery->bind_param("si", $name, $locationID);
	$checkQuery->execute();

	$result = $checkQuery->bind_result($count);

	$checkQuery->fetch();
		
	if (false === $checkQuery) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;
	}

	if ($count > 0) {

		$output['status']['code'] = "401";
		$output['status']['name'] = "unauthorised";
		$output['status']['description'] = "success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = "This Department {$name} already exists for this location.";
		
		mysqli_close($conn);

		echo json_encode($output); 

		exit();

	} else {

	$query = $conn->prepare('INSERT INTO department (name, locationID) values (?,?)');
	$query->bind_param('si', $name, $locationID);
	
	if ($query->execute()) {
		// Fetch the last inserted ID
		$last_id = $conn->insert_id;
		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "success";
		$output['data'] = []; 
		$output['data']['id'] = $last_id; // Add the last inserted ID to the output
	
		echo json_encode($output);
	
	} else {
		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;
	}
}
?>

