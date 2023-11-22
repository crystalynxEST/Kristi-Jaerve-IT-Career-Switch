// ---------------------------------------------------------- Weather
function weatherFieldsAreNotEmpty() {
    var north = $('#north').val();
    var south = $('#south').val();
    var east = $('#east').val();
    var west = $('#west').val();

    if (north.trim() === '' || south.trim() === '' || east.trim() === '' || west.trim() === '') {
        return false;
    }

    return true; // All fields have values
}

$(function () {
    $('#btnSubmitWeather').click(function () {
        console.log('Button clicked');

        if (weatherFieldsAreNotEmpty()) {
            $.ajax({
                url: "libs/php/getWeather.php",
                type: 'GET',
                dataType: 'json',
                data: {
                    north: $('#north').val(),
                    south: $('#south').val(),
                    east: $('#east').val(),
                    west: $('#west').val(),

                },
                success: function (result) {

                    console.log(JSON.stringify(result));

                    if (result.status.code == "200") {
                        console.log(result['data']);
                        $('#latWeather').html(result['data'][0]['lat']);
                        $('#lngWeather').html(result['data'][0]['lng']);
                        $('#observation').html(result['data'][0]['observation']);
                        $('#ICAO').html(result['data'][0]['ICAO']);
                        $('#clouds').html(result['data'][0]['clouds']);
                        $('#dewPoint').html(result['data'][0]['dewPoint']);
                        $('#datetime').html(result['data'][0]['datetime']);
                        $('#temperature').html(result['data'][0]['temperature']);
                        $('#humidity').html(result['data'][0]['humidity']);
                        $('#stationName').html(result['data'][0]['stationName']);
                        $('#weatherCondition').html(result['data'][0]['weatherCondition']);
                        $('#windDirection').html(result['data'][0]['windDirection']);
                        $('#windSpeed').html(result['data'][0]['windSpeed']);
                        $('#weatherErrorMessage').text('');
                    } else {
                        console.log(result);
                        $('#weatherErrorMessage').text(result.status.description);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log("AJAX Error: " + textStatus, errorThrown);
                    console.log(jqXHR.responseText);
                }
            });
        } else {
            $('#weatherErrorMessage').text('Please fill in all the fields: north, south, east and west and try again.')
        }
    });
});

// ---------------------------------------------------------- POST CODE 
function postalFieldsAreNotEmpty() {
    var postalCode = $('#postalCode').val();

    if (postalCode.trim() === '') {
        return false;
    }

    return true;
}

$(function () {
    $('#btnSubmitPostal').click(function () {
        console.log('Button clicked');

        if (postalFieldsAreNotEmpty()) {
            $.ajax({
                url: "libs/php/getPostalCode.php",
                type: 'GET',
                dataType: 'json',
                data: {
                    postalCode: $('#postalCode').val(),

                },
                success: function (result) {

                    console.log(JSON.stringify(result));

                    if (result.status.code == "200") {
                        console.log(result['data']);
                        $('#adminName3').html(result['data'][0]['adminName3']);
                        $('#lngPostCode').html(result['data'][0]['lng']);
                        $('#latPostCode').html(result['data'][0]['lat']);
                        $('#adminName3').html(result['data'][0]['adminName3']);
                        $('#adminName2').html(result['data'][0]['adminName2']);
                        $('#countryCode').html(result['data'][0]['countryCode']);
                        $('#postalCodeOther').html(result['data'][0]['postalCode']);
                        $('#adminName1').html(result['data'][0]['adminName1']);
                        $('#placeName').html(result['data'][0]['placeName']);
                        $('#postalCodeErrorMessage').text('');
                    } else {
                        console.log(result);
                        $('#postalCodeErrorMessage').text(result.status.description);
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log("AJAX Error: " + textStatus, errorThrown);
                    console.log(jqXHR.responseText);
                }
            });
        }
        else {
            $('#postalCodeErrorMessage').text('Please fill in the field: Postal Code and try again.')
        }
    });
});


// ---------------------------------------------------------- TimeZone


function timeZoneFieldsAreNotEmpty() {
    var lat = $('input[name="lat"]').val();
    var lng = $('input[name="lng"]').val();

    if (lat.trim() === '' || lng.trim() === '') {
        return false;
    }

    return true;
}

$(function () {
    $('#btnSubmitTimeZone').click(function () {
        console.log('Button clicked');

        if (timeZoneFieldsAreNotEmpty()) {
            $.ajax({
                url: "libs/php/getTimeZone.php",
                type: 'GET',
                dataType: 'json',
                data: {
                    lat: $('input[name="lat"]').val(), // Get the value of the latitude input field
                    lng: $('input[name="lng"]').val(), // Get the value of the longitude input field

                },
                success: function (result) {

                    console.log(JSON.stringify(result));

                    if (result.status.code == "200") {
                        console.log(result['data']);
                        $('#countryCodeTime').html(result['data']['countryCode']);
                        $('#countryName').html(result['data']['countryName']);
                        $('#lat').html(result['data']['lat']);
                        $('#lng').html(result['data']['lng']);
                        $('#dstOffset').html(result['data']['dstOffset']);
                        $('#gmtOffset').html(result['data']['gmtOffset']);
                        $('#rawOffset').html(result['data']['rawOffset']);
                        $('#timezoneId').html(result['data']['timezoneId']);
                        $('#time').html(result['data']['time']);
                        $('#sunrise').html(result['data']['sunrise']);
                        $('#sunset').html(result['data']['sunset']);
                        $('#timezoneErrorMessage').text('');
                    } else {
                        console.log(result);
                        $('#timezoneErrorMessage').text(result.status.description);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log("AJAX Error: " + textStatus, errorThrown);
                    console.log(jqXHR.responseText);
                }
            });
        } else {
            $('#timezoneErrorMessage').text('Please fill in the fields: latitude and longitude and try again.')
        }
    });
});
