<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

if (isset($_REQUEST['lat']) && isset($_REQUEST['lng'])) {
    $lat = $_REQUEST['lat'];
    $lng = $_REQUEST['lng'];

    $url = 'http://api.geonames.org/timezoneJSON?formatted=true&lat=' . $lat . '&lng=' . $lng . '&username=crystalynx&style=full';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    $result = curl_exec($ch);

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode === 400) {
        $output['status']['code'] = "400";
        $output['status']['name'] = "Bad Request";
        $output['status']['description'] = "The request is invalid: Latitude and/or Longitude was not provided or not in correct format";
    } else {
        $decode = json_decode($result, true);

        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['data'] = $decode;
    }

    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    curl_close($ch);
} else {
    $output['status']['code'] = "400";
    $output['status']['name'] = "Bad Request";
    $output['status']['description'] = "The request is invalid: Latitude and/or Longitude was not provided or not in correct format";
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);
exit;
