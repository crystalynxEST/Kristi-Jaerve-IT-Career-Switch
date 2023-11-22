<?php

	include './config.php';
	include './functions.php';

	// Debugging
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	// Check country parameter is not set in the URL
	if (!isset($_GET['country']))
	{
		handleErrors(400, 'Missing country.');
	}

	$country = $_GET['country'];

	// Build query string for WikipediaSearchJSON API
	$queryString = http_build_query([
		'q' => $country,
		'maxRows' => 5,
		'username' => GEONAME_USERNAME,
	]);

	$executionStartTime = microtime(true);

	// Set API URL for WikipediaSearchJSON
	$url='http://api.geonames.org/wikipediaSearchJSON?' . $queryString;

	$result = performCurlRequest($url);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode;

	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 
?>
