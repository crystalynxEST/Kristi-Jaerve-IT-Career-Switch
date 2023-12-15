<?php

	// remove next two lines for production
	
	// ini_set('display_errors', 'On');
	// error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) * 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;
	}	
	
	// Query to check if departments exists with this location
	
    $checkQuery = $conn->prepare('SELECT COUNT(personnel.id) as count, department.name as name FROM department LEFT JOIN personnel ON (department.id = personnel.departmentID) where personnel.departmentID = ?');
    $checkQuery->bind_param("i", $_POST['id']);
    $checkQuery->execute();

	$checkQuery->store_result(); // Store the result
	$checkQuery->bind_result($count, $name);
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

	$checkQuery->free_result(); // Free the result
	$checkQuery->close(); // Close the statement for the "Commands out of sync" network response


    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) * 1000 . " ms";
    $output['data']['count'] = $count;
    $output['data']['name'] = $name;
    
    mysqli_close($conn);

    echo json_encode($output); 
	
?>