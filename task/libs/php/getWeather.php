<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

if (isset($_REQUEST['north']) && isset($_REQUEST['south']) && isset($_REQUEST['east']) && isset($_REQUEST['west'])) {

	$north = $_REQUEST['north'];
	$south = $_REQUEST['south'];
	$east = $_REQUEST['east'];
	$west = $_REQUEST['west'];

	$url = 'http://api.geonames.org/weatherJSON?formatted=true&north=' . $north . '&south=' . $south . '&east=' . $east . '&west=' . $west . '&username=crystalynx&style=full' . '&maxRows=1';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, $url);

	$result = curl_exec($ch);

	$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	if ($httpCode === 400) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "Bad Request";
		$output['status']['description'] = "The request is invalid: Information was not provided or not in correct format. Please enter number only (negative or positive).";
	} else {
		$decode = json_decode($result, true);

		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "success";
		$output['data'] = $decode['weatherObservations'];
	}

	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	curl_close($ch);
} else {
	$output['status']['code'] = "400";
	$output['status']['name'] = "Bad Request";
	$output['status']['description'] = "The request is invalid: Information was not provided or not in correct format. Please enter number only (negative or positive).";
}
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);
exit;
