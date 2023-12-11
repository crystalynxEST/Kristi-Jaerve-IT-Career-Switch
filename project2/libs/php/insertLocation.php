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
	


	$name = htmlspecialchars(trim($_POST['name']));

	// Input validation
	if (!$name) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "invalid input";
		$output['status']['description'] = "Invalid or missing location name";  
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;
	}
	
	// Query to check if departments exists with this location
	$checkQuery = $conn->prepare('SELECT COUNT(*) FROM `location` WHERE name = ?');
	$checkQuery->bind_param("s", $name);
	$checkQuery->execute();
	$checkQuery->bind_result($count);
	$checkQuery->fetch();
	$checkQuery->free_result();
		
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
		$output['data'] = "This location {$name} already exists.";
		
		mysqli_close($conn);

		echo json_encode($output); 

		exit();
	} else {
	
		$query = $conn->prepare('INSERT INTO location (name) VALUES (?)');
		$query->bind_param('s', $name);
		

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