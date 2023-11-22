<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

if (isset($_REQUEST['postalCode'])) {

	$postalCode = $_REQUEST['postalCode'];

	$url = 'http://api.geonames.org/postalCodeSearchJSON?formatted=true&postalcode=' . $postalCode . '&username=crystalynx&style=full' . '&maxRows=1' . '&style=MEDIUM';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, $url);

	$result = curl_exec($ch);

	$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	if ($httpCode === 400) {
		$output['status']['code'] = "400";
		$output['status']['name'] = "Bad Request";
		$output['status']['description'] = "The request is invalid: Postal code was not provided or not in correct format";
	} else {
		$decode = json_decode($result, true);

		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "success";
		$output['data'] = $decode['postalCodes'];
	}

	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	curl_close($ch);
} else {
	$output['status']['code'] = "400";
	$output['status']['name'] = "Bad Request";
	$output['status']['description'] = "The request is invalid: Postal code was not provided or not in correct format";
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);
exit;
