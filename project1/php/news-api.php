<?php

    include './config.php';
    include './functions.php';

    // Debugging
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    // Check iso2 is not set in URL
    if (!isset($_GET['iso2']))
    {
        handleErrors(400, 'Missing iso code for country.');
    }

    // Get iso2 parameter from URL
    $iso2 = $_GET['iso2'];

    // Query string for MediaStack API
    $queryString = http_build_query([
        'access_key' => NEWS_API_KEY,
        'countries' => $iso2,
        'languages' => 'en', // Language English
        'limit' => 5, // Fetch top 5 news
    ]);

    // API URL for MediaStack
    $url='http://api.mediastack.com/v1/news?' . $queryString;

    $response = performCurlRequest($url);

    header('Content-Type: application/json; charset=UTF-8');

    // Decode the JSON response
    $data = json_decode($response, true);

    // Output the response
    echo $response;
?>
