<?php

include './config.php';
include './functions.php';


ini_set('display_errors', 'On');
error_reporting(E_ALL);

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch($action) {
        case 'currencyRate':
            // Generate query string to append to the API URL
            $queryString = http_build_query([
                'app_id' => EXCHANGE_RATE_APP_ID
            ]);
            
            $url='https://openexchangerates.org/api/latest.json?'. $queryString;
            break;

        case 'currencyName':
            $queryString = http_build_query([
                'show_alternative' => 1
            ]);
            
            $url='https://openexchangerates.org/api/currencies.json?'. $queryString;
            break;
        default:
            handleErrors(400, 'Invalid action specified');
        break;
    }
} else {
    // If no action parameter is provided, return an error
handleErrors(400, 'Invalid action specified');
}


$executionStartTime = microtime(true);

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
