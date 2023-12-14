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
	$checkQuery = $conn->prepare('SELECT COUNT(*) FROM department WHERE locationID = ?');
	$checkQuery->bind_param("i", $_POST['id']);
	$checkQuery->execute();

    $checkQuery->store_result(); // Store the result
    $checkQuery->bind_result($count);
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
    $checkQuery->close(); // Close the statement for the "Commands out of sync" network response.

	if ($count > 0) {

		$output['status']['code'] = "401";
		$output['status']['name'] = "unauthorised";
		$output['status']['description'] = "success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) * 1000 . " ms";
		$output['data'] = "This location has {$count} departments linked to it.";
		
		mysqli_close($conn);

		echo json_encode($output); 

		exit();
	} else {
	
		// Delete location query
		$query = $conn->prepare('DELETE FROM location WHERE id = ?');	
		$query->bind_param("i", $_POST['id']);
		$query->execute();
	
		
		if (false === $query) {

			$output['status']['code'] = "400";
			$output['status']['name'] = "executed";
			$output['status']['description'] = "query failed";	
			$output['data'] = [];

			mysqli_close($conn);

			echo json_encode($output); 

			exit;
		}

		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "success";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];
		
		mysqli_close($conn);

		echo json_encode($output); 
		
	}
?>