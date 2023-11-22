<?php

include './functions.php';

ini_set('display_errors', 'On');
error_reporting(E_ALL);

// Function to get ISO codes and names
function getCountryList()
{
    // Load GeoJSON file
    $geoJson = file_get_contents('../data/countryInfo.json');
    // Decode JSON data
    $dataRead = json_decode($geoJson, true);
    // Check if data was decoded correctly
    if ($dataRead !== null) {
            $countries = array();
            // Iterate through decoded data
            foreach ($dataRead as $data) {
                // Extract feature from data
                $feature = $data['features'][0];
                // Get ISO-2, ISO-3, and country name
                $iso2 = $feature['iso_a2'];
                $iso3 = $feature['iso_a3'];
                $name = $feature['name'];

                $countries[$iso2] = array('iso3' => $iso3, 'name' => $name);
            }

            return $countries;
    } else {
        handleErrors(400, 'Error decoding JSON file.');
    }
}

// Function to get country border by ISO code
function getCountryBorder($iso2)
{
    $geoJson = file_get_contents('../data/countryBorders.json');
    $data = json_decode($geoJson, true);
    if ($data !== null) {
    $border = null;
        
        foreach ($data as $feature) {
            // If feature's iso_a2 matches input
            if ($feature['iso_a2'] === $iso2) {
                $border = $feature['geometry'];
                break;
            }
        }
        return $border;
    } else {
        handleErrors(400, 'Error decoding JSON file.');
    }
}

// Decide which action to perform based on the provided action parameter
if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch($action) {
        case 'getCountryList':
            $result = getCountryList();
        break;
        case 'getCountryBorder':
            if (isset($_GET['iso2'])) {
                $iso2 = $_GET['iso2'];
                $result = getCountryBorder($iso2);
            } else {
                handleErrors(400, 'Invalid action specified');
            }
        break;

        default:
            handleErrors(400, 'Invalid action or missing parameters');
        break;
    }

    // Response content type to JSON
    header('Content-Type: application/json');

    // Output the result as JSON
    echo json_encode($result);
} else {
    // If no action parameter is provided, return an error
    handleErrors(400, 'Invalid action specified');
}

?>