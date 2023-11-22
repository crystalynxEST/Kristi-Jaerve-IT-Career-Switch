<?php

include './config.php';
include './functions.php';

// Error reporting for debugging
ini_set('display_errors', 'On');
error_reporting(E_ALL);

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch($action) {
        case 'countryInfo':
        // Check if action parameter is set in URL
        if (isset($_GET['country'])) {
            $country = $_GET['country'];

            // Build query string for countryInfo API
            $queryString = http_build_query([
                'country' => $country,
                'username' => GEONAME_USERNAME,
                'lang' => 'en',
            ]);
            
            $url='http://api.geonames.org/countryInfoJSON?' . $queryString;
        } else {
            handleErrors(400, 'Missing country');
        }
        break;
        
        case 'findCapital':
            // Check capital parameter is set in URL
            if (isset($_GET['capital'])) {
            $capital = $_GET['capital'];

            // Build query string for searchJSON API
            $queryString = http_build_query([
                'q' => $capital,
                'username' => GEONAME_USERNAME,
                'maxRows' => 1,
                'lang' => 'en',
            ]);

            $url='http://api.geonames.org/searchJSON?' . $queryString;
        } else {
            handleErrors(400, 'Missing capital');
        }
        break;

        case 'findNearby':

            // Check lat and lng parameters are set in URL
            if (isset($_GET['lat']) && isset($_GET['lng'])) {
            $lat = $_GET['lat'];
            $lng = $_GET['lng'];
            
            // Build query string for findNearbyJSON API
            $queryString = http_build_query([
                'lat' => $lat,
                'lng' => $lng,
                'username' => GEONAME_USERNAME
            ]);
            
            // Set findNearbyJSON API URL
            $url='http://api.geonames.org/findNearbyJSON?' . $queryString;
        } else {
            handleErrors(400, 'Missing lat or lng co-ordinates');
        }
        break;

        case 'findMarkers':

        // Check marker and country parameters are set in URL
        if (isset($_GET['marker']) && isset($_GET['country'])) {
            $marker = $_GET['marker'];
            $country = $_GET['country'];

            // Build query string for searchJSON API + featureCode and country
            $queryString = http_build_query([
                'featureCode' => $marker,
                'username' => GEONAME_USERNAME,
                'maxRows' => 12,
                'country' => $country,
            ]);

            // SearchJSON API URL
            $url='http://api.geonames.org/searchJSON?' . $queryString;
            } else {
                handleErrors(400, 'Missing marker or country');
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

$decode = json_decode($result,true);	

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode;

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);