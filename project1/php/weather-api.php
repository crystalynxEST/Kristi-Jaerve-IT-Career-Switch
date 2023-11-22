<?php

    include './config.php';
    include './functions.php';

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
        
        header('Content-Type: application/json; charset=UTF-8');

        echo $result;

    } else {
        // Handle error - latitude and longitude not provided
        handleErrors(400, 'Latitude and longitude not provided.');
    }
?>