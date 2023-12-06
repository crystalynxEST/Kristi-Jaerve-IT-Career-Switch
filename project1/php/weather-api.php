<?php

include './config.php';
include './functions.php';


if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'weather':

            if (isset($_GET['lat']) && isset($_GET['lon'])) {
                $lat = $_GET['lat'];
                $lon = $_GET['lon'];

                // Validate input: Check if latitude and longitude are numeric
                if (!is_numeric($lat) || !is_numeric($lon)) {
                    handleErrors(400, 'Invalid latitude or longitude.');
                    exit; // Stop execution to prevent further processing
                }

                // Validate input: Check if latitude and longitude are within a reasonable range
                $lat = floatval($lat);
                $lon = floatval($lon);

                if ($lat < -90 || $lat > 90 || $lon < -180 || $lon > 180) {
                    handleErrors(400, 'Latitude or longitude out of range.');
                    exit; // Stop execution to prevent further processing
                }

                $queryString = http_build_query([
                    'lat' => $lat,
                    'lon' => $lon,
                    'appid' => WEATHER_APP_ID
                ]);

                $url = "https://api.openweathermap.org/data/2.5/weather?" . $queryString;

                $result = performCurlRequest($url);
            } else {
                handleErrors(400, 'Missing Latitude or Longitude');
            }
            break;
        case 'forecast':
            if (isset($_GET['capital'])) {
                $capital = $_GET['capital'];

                // Build query string for searchJSON API
                $queryString = http_build_query([
                    'q' => $capital,
                    'rows' => 8,
                    'units' => 'metric',
                    'appid' => WEATHER_APP_ID
                ]);

                $url = "https://api.openweathermap.org/data/2.5/forecast?" . $queryString;

            } else {
                handleErrors(400, 'Missing capital');
            }
            break;

        default:
            handleErrors(400, 'Invalid action specified');
            break;
    }
} else {
    // If no action parameter is provided, return an error
    handleErrors(400, 'Invalid action specified');
}

// Measure execution time
$executionStartTime = microtime(true);

$result = performCurlRequest($url);

$decode = json_decode($result, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode;

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
