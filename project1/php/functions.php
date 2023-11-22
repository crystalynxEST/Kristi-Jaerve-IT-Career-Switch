<?php

// Function to sanitize input
function sanitizeInput($input) {
    // Remove whitespace, trim and strip tags
    return htmlspecialchars(strip_tags(trim($input)));
}

// Function to handle errors
function handleErrors($errorCode = 500, $errorMessage) {
    // Set error code as the header
    header('HTTP/1.1 ' .  $errorCode);
    // Encode the error message
    echo json_encode(['error' => $errorMessage]);
    exit;
}

function performCurlRequest($url)
{
    $ch = curl_init();
    // Set user agent, SSL verification and return transfer
    curl_setopt($ch, CURLOPT_USERAGENT, 'MyUserAgent');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // Set cURL URL to given parameter
    curl_setopt($ch, CURLOPT_URL, $url);
    // Execute cURL session and store the result
    $result = curl_exec($ch);

    // Check if there are errors
    if ($result === false) {
        $errorCode = curl_errno($ch);
        $errorMessage = curl_error($ch);
        $message = "Curl Error ($errorCode): $errorMessage\n";
        curl_close($ch);
        handleErrors($errorCode, $message);
    } 

        curl_close($ch);

    return $result;
}
