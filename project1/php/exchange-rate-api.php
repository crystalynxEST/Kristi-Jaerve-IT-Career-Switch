<?php

include './config.php';
include './functions.php';

// Generate query string to append to the API URL
$queryString = http_build_query([
    'app_id' => EXCHANGE_RATE_APP_ID
]);

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

$url='https://openexchangerates.org/api/latest.json?'. $queryString;

// Make a GET request to the specified URL
$result = performCurlRequest($url);

// Decode API response
$decode = json_decode($result,true);	

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
// Use microtime(true) to calculate the time taken to fetch data from the API
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
// Array containing the status and decoded data from the API
$output['data'] = $decode;

// Set content type of the response
header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output); 
