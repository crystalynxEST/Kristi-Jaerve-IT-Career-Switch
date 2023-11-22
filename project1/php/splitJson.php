<?php

    // Debugging
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $jsonData = file_get_contents('../data/countryBorders.geo.json');
    $data = json_decode($jsonData, true);

    $countryInfoFileData = [];
    $countryBorderFileData = [];

    // Iterate through all features in the original data
    foreach ($data['features'] as $feature) {
        
        // Create data for the first file (countryInfo.json)
        $countryInfoFileData[] = [
            "type" => $data["type"],
            "features" => [$feature["properties"]],
        ];

        // Create data for the second file (countryBorders.json)
        $countryBorderFileData[] = [
            "type" => $data["type"],
            "name" => $feature["properties"]["name"],
            "iso_a2" => $feature["properties"]["iso_a2"],
            "geometry" => $feature["geometry"],
        ];
    }

    // Convert the data arrays to JSON format with pretty printing
    $countryInfoFileDataJson = json_encode($countryInfoFileData, JSON_PRETTY_PRINT);

    file_put_contents('../data/countryInfo.json', $countryInfoFileDataJson);

    $countryBorderFileDataJson = json_encode($countryBorderFileData, JSON_PRETTY_PRINT);

    file_put_contents('../data/countryBorders.json', $countryBorderFileDataJson);

    echo "JSON files created successfully!";
?>