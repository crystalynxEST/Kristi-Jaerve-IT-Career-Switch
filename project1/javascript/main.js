// Catch unhandled errors
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.error("Uncaught error:", msg, "URL:", url, "Line:", lineNo, "Column:", columnNo, "Error object:", error);
};

/* --------------------------------------------- API URL SET-UP --------------------------------*/

var countryApiUrl = "./php/api.php";
var newsApiUrl = "./php/news-api.php";
var weatherApiUrl = "./php/weather-api.php";
var geoNamesApiUrl = "./php/geonames-api.php";
var wikimediaApiUrl = "./php/wikimedia-api.php";
var exchangeDataApiUrl = "./php/exchange-rate-api.php";


// Global scope variables

var currentLocation = {}; 
var exchangeRates = {};
var currentCountry = {};
var countryCurrencyNames = {};

// Initialize the Leaflet map
var map = L.map("map", {
  doubleClickZoom: false,
  maxZoom: 20, // Add maxZoom property
}).setView([51.505, -0.09], 6);


// GeoJSON and Marker Cluster Groups
let border = new L.GeoJSON();

const shopMarkers = L.markerClusterGroup();
const airportMarkers = L.markerClusterGroup();
const forestMarkers = L.markerClusterGroup();
const parkMarkers = L.markerClusterGroup();

// Set Up Overlays
const overlays = {
  "Shops": shopMarkers,
  "Airports" : airportMarkers,
  "Forest": forestMarkers,
  "Parks": parkMarkers,
};

/* --------------------------------------------- MARKER ICONS --------------------------------*/
var markers = [
  {
    featureCode: "RET",
    overlayLayer: 'shopMarkers'
  },
  {
    featureCode: "AIRP",
    overlayLayer: 'airportMarkers'
  },
  {
    featureCode: "FRST",
    overlayLayer: 'forestMarkers'
  },
  {
    featureCode: "PRK",
    overlayLayer: 'parkMarkers'
  },
];

var shopMapMarkers = [];
var airportMapMarkers = [];
var forestMapMarkers = [];
var parkMapMarkers = [];

var homeIcon = L.divIcon({
  className: 'leaflet-div-icon',
  html: '<div class="icon-container"></div>',
});

var customCapitalIcon = L.icon({
  iconUrl: 'node_modules/bootstrap-icons/icons/Circle_4.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40] 
});

var customShopIcon = L.icon({
  iconUrl: 'node_modules/bootstrap-icons/icons/Shop.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

var customPlaneIcon = L.icon({
  iconUrl: './node_modules/bootstrap-icons/icons/Plane_4.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

var customForestIcon = L.icon({
  iconUrl: './node_modules/bootstrap-icons/icons/Forest.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

var customParkIcon = L.icon({
  iconUrl: './node_modules/bootstrap-icons/icons/Leaf_4.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Marker cluster group
var markerClusters = L.markerClusterGroup();

var MapIcon = L.Icon.extend({
  options: {
    iconSize: [25, 25],
    popupAnchor: [0, -50],
  },
});

/*------------------------------------------------ Map layers -------------------------------------------*/
var osmHOT = L.tileLayer(
"https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

var openTopoMap = L.tileLayer(
"https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 20,
    attribution:
      "Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)",
  }
);

var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution: "© OpenStreetMap",
}).addTo(map);

var googleSat = L.tileLayer(
"https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

var googleTerrain = L.tileLayer(
"https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

// var geocoder = L.Control.geocoder().addTo(map);

googleSat.addTo(map);

// Standalone pop-up
var popup = L.popup();
var apiData = [];

// Base layers and overlay
var baseMaps = {
  "OpenStreetMap": osm,
  "OpenStreetMap.HOT": osmHOT,
  "OpenTopoMap": openTopoMap,
  "Google Satellite": googleSat,
  "Google Terrain": googleTerrain,
};

// Layer Control
layerControl = L.control.layers(baseMaps, overlays).addTo(map);

/* -------------------------------------------- MAP BUTTONS --------------------------------*/

L.easyButton({
  id: "demographicsBtn",
  states: [
    {
      stateName: "default",
      icon: "fas fa-globe fa-2x",
      title: "Demographics",
      onClick: function (btn, map) {
        fetchAndDisplayDemographics();
      },
    },
  ],
}).addTo(map);

L.easyButton({
  id: "newsBtn",
  states: [
    {
      stateName: "default",
      icon: "far fa-newspaper fa-2x",
      title: "News",
      onClick: function (btn, map) {
        fetchAndDisplayNews();
        console.log("newsBtn clicked");
      },
    },
  ],
}).addTo(map);

L.easyButton({
  id: "wikimediaBtn",
  states: [
    {
      stateName: "default",
      icon: "fab fa-wikipedia-w fa-2x",
      title: "Wikimedia",
      onClick: function (btn, map) {
        getWikimedia();
      },
    },
  ],
}).addTo(map);

L.easyButton({
  id: "exchangeBtn",
  states: [ 
    {
      stateName: "default",
      icon: "fas fa-exchange-alt fa-2x",
      title: "Currency exchange",
      onClick:function (btn, map) {
        getExchangeRates();
      },
    },
  ],
}).addTo(map);

L.easyButton({
  id: "weatherBtn",
  states: [ 
    {
      stateName: "default",
      icon: "fas fa-sun fa-2x",
      title: "Weather",
      onClick:function (btn, map) {
        getWeather();
      },
    },
  ],
}).addTo(map);


/* ------------------------------------------- LOADER FUNCTIONS --------------------------------*/

// Function to show the loader
function showLoader() {
  $("#loader-container").show();
}

// Function to hide the loader
function hideLoader() {
  document.getElementById('preloader').style.display = 'none';
  $("#loader-container").hide();
}

// Function to show Modal
function showModal(title, content) {
  $("#newsModalLabel.modal-title").html(title);
  $("#newsModal .modal-body").html(content);
  $("#newsModal").modal("show");
}

/*------------------------------------- ADD MARKERS TO THE MAP --------------------------------*/
async function addMarkers(data, markerClusterGroup, customIcon) {

  var markerName = capitalizeFirstLetter(data.fcodeName);
  var marker = L.marker([parseFloat(data.lat), parseFloat(data.lng)], { icon: customIcon }).bindPopup(`<b>${markerName}</b>: ${data.name}`);
     // Bind a tooltip to the marker
    marker.bindTooltip(data.name, {
      permanent: false,  // Tooltip will only show on hover
      direction: 'top',  // The direction of the tooltip
      offset: L.point(0, -20)  // Offset to position the tooltip above the marker
  });
 
  markerClusterGroup.addLayer(marker);
}

L.easyButton("fa-circle-info fa-2x", function (btn, map) {
  
  $('#howToModal').modal("show");
  
}).addTo(map);

/*--------------------------------------------- DOCUMENT READY --------------------------------*/
$(document).ready(async() => {
// Show loading screen
showLoader();


// geocoder.on('markgeocode', async function (event) {

//   var coordinates = new L.LatLng(
//     event.geocode.center.lat,
//     event.geocode.center.lng
//   );

//   await updateMapUsingCoordinates(coordinates);

//   // Display the country border for the user's location
//   await updateMap(currentCountry.countryCode);
// });

/* --------------------------------------------- UPDATE MAP USING COORDINATES -----------------*/
async function updateMapUsingCoordinates(coordinates) {

  await setupUserLocation(coordinates);

  map.setView(coordinates, 6); // 6 is the zoom level
  await findUserCountry(coordinates);
  var countryCode = currentCountry.countryCode;
  await getGeonameDataFromCountry(countryCode);
  await getFeatureMarkers(currentCountry);
  await addFeatureMarkersToMap();
  await findCapital(currentCountry);
  await checkNewsAvailability(countryCode);

  hideLoader();
}

/* --------------------------------------------- COUNTRY -------------------------------- */
// AJAX call to get country list and borders
await $.ajax({
  url: countryApiUrl,
  type: "GET",
  data: { action: "getCountryList" },
  success: function (response) {

    countryInfo = response;

    // Populate the country dropdown
    populateCountryDropdown(response);
  },
  error: function (error) {
    console.error("Error fetching country list:", error);
    console.log("Raw Server Response:", xhr.responseText);
  },
});

// Find user location
getUserLocation();

/* -------------------------------------- USER LOCATION -------------------------*/

async function setupUserLocation(userLatLng) {

  if (!map.hasLayer(L.tileLayer)) {
    map.setView(userLatLng, 6); // 6 is the zoom level
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // var userMarker = L.marker(userLatLng, { icon: homeIcon }).addTo(markerClusters);
  }
}
function getUserLocation() {
  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      showUserLocation,showUserLocationError);
  } else {
    alert("Geolocation is not supported by your browser, please choose a country from the dropdown.");
    hideLoader();
  }
}

// Show user location
async function showUserLocation(position) {

  var userLatLng = new L.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );

  // Update the map view to center around the user's location without zooming
  map.panTo(userLatLng, { animate: false });
  if (currentCountry) {
    
  await updateMapUsingCoordinates(userLatLng);
  // add User Marker  
  // var userMarker = L.marker(userLatLng, { icon: homeIcon }).addTo(map);
  // Display the country border for the user's location
  await updateMap(currentCountry.countryCode);
} else {
  // Handle the case where currentCountry is not defined
  console.error("Error: currentCountry is not defined.");
}
}

// User location error
async function showUserLocationError(error)
{
  console.error("Error getting geolocation:", error.message);
  alert("We're sorry your location could not be determined....defaulting to United Kingdom");

  // Default location to UK / GB
  defaultCountryCode = 'GB';
  $("#countrySelect option").each(function() {
    // Check if the data-country attribute matches the target country
    if ($(this).data("iso") === defaultCountryCode) {
      // Set the selected attribute for the matching option
      $(this).prop("selected", true);
    }
  });

  await updateMap(defaultCountryCode);
  await getGeonameDataFromCountry(defaultCountryCode);
  await getFeatureMarkers(currentCountry);
  await addFeatureMarkersToMap();
  await findCapital(currentCountry);
  await checkNewsAvailability(defaultCountryCode);

  hideLoader();
}

async function findUserCountry(userLatLng) {
  var lat = userLatLng.lat;
  var lng = userLatLng.lng;

  await $.ajax({
    url: geoNamesApiUrl,
    type: "GET",
    data: { action: 'findNearby', lat: lat, lng: lng },
    success: function (response) {
      currentCountry = response["data"]["geonames"][0];

      // Update the country selection
      $("#countrySelect option").each(function() {
        // Check if the data-country attribute matches the target country
        if ($(this).data("country") === currentCountry.countryName) {
          // Set the selected attribute for the matching option
          $(this).prop("selected", true);
        }
      });
    }
  });
}

// Modify the setupUserLocation function
async function setupUserLocation(userLatLng) {
  if (!map.hasLayer(L.tileLayer)) {
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

  }
  map.panTo(userLatLng, { animate: false });
}

/* ------------------------------------ INFORMATION/HOW TO BUTTON ------------------------------- */
$("#informationButton").on("click", function () {
  $("#informationModal").modal("show");
});

/* ------------------------------------ BUTTON CLICKS ------------------------------- */

  
// Map double click
map.on("dblclick", onMapClick);

// Map on-click function
async function onMapClick(e) {
  showLoader();

// Fetch country information based on clicked coordinates
await getCountryFromCoordinates(e.latlng);

// Hide loader after getting country information
hideLoader();
}

// Function to fetch country information from coordinates
async function getCountryFromCoordinates(latlng) {
var lat = latlng.lat;
var lon = latlng.lng;

// Make AJAX call to get country information
await $.ajax({
  url: geoNamesApiUrl,
  type: "GET",
  dataType: "JSON",
  data: { action: 'findNearby', lat: lat, lng: lon },
  success: function (response) {
      if (response["data"]["geonames"][0]) {
        var countryCode = response["data"]["geonames"][0]["countryCode"];

        // Update the country selection
        $("#countrySelect").val(countryCode).trigger('change');
      } else {
          console.log("No country information found for the clicked coordinates.");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error fetching country information:", textStatus, errorThrown);
      console.log("Raw Server Response:", jqXHR.responseText);
    },
  });
}

/* --------------------------------------------- COUNTRY SELECT --------------------------------*/
$("#countrySelect").on("change", async function () {
  showLoader();
  
  var selectedOption = $(this).find("option:selected");

  var countryCode = selectedOption.data("iso");
  var selectedISO = $(this).val();

  await updateMap(selectedISO);

  await getGeonameDataFromCountry(countryCode);
  await getFeatureMarkers(currentCountry);
  await addFeatureMarkersToMap();

  await findCapital(currentCountry);
  await checkNewsAvailability(selectedISO);
  await fetchAndDisplayDemographics();

  hideLoader();
});

/* --------------------------------------------- NEWS --------------------------------*/
async function checkNewsAvailability(iso2) {

await $.ajax({
  url: newsApiUrl,
  type: "GET",
  dataType: "JSON",
  data: { iso2: iso2 },
  success: function (newsResponse) {

      if (newsResponse.error) {
        console.log(newsResponse.error);
        hideNewsButton();
      } else {
        // If there is news information, show the news button
        if (newsResponse.data.length > 0) {
          showNewsButton();
        } else {
          // If there is no news information, hide the news button
          hideNewsButton();
        }
      }
    },
    error: function (error) {
      console.error("Error checking news availability:", error);
      // If there is an error, hide the news button
      hideNewsButton();
    },
  });
}

// Function to show the news button
function showNewsButton() {
  $("#newsBtn").show();
}

/* --------------------------------------------- POPULATE COUNTRY DROP-DOWN --------------------------------*/
// Populate country dropdown
function populateCountryDropdown(countries) {
  var select = document.getElementById("countrySelect");

  // Sort the countries alphabetically by name
  var sortedCountries = Object.entries(countries).sort((a, b) =>
    a[1].name.localeCompare(b[1].name)
  );

  // Clear existing options
  select.innerHTML = "";

  // Add sorted options to the dropdown
  for (var [iso2, country] of sortedCountries) {
    var option = document.createElement("option");
    option.value = iso2;
    option.text = country.name;
    option.setAttribute("data-iso", iso2);
    option.setAttribute("data-country", country.name);

    select.add(option);
  }
}

// Update the map based on selected country
async function updateMap(iso2) {
  
  markerClusters.clearLayers();

  // AJAX call to get country border
  $.ajax({
    url: countryApiUrl,
    type: "GET",
    data: { action: "getCountryBorder", iso2: iso2 },
    success: function (border) {
      // Clear previous country border
      if (currentCountryBorder) {
        map.removeLayer(currentCountryBorder);
      }
      // Update map with country border
      if (border) {
        currentCountryBorder = L.geoJSON(border).addTo(map);
        map.fitBounds(currentCountryBorder.getBounds());
      }
      // Callback to signal that map update is complete
      if (typeof mapUpdateCallback === 'function') {
        mapUpdateCallback();
      }
    },
    error: function (error) {
      console.error("Error fetching country border:", error);
    },
  });
}

// Add a global variable to store the current country border
var currentCountryBorder = null;
// Define a callback function for map update completion
var mapUpdateCallback;


var capitalMarker = null;


/*--------------------------------------------- FIND CAPITAL --------------------------------*/
async function findCapital(currentCountry) {

  var capital = currentCountry.capital;
      // Clear the existing capital marker if it exists
      if (capitalMarker) {
        map.removeLayer(capitalMarker);
        capitalMarker = null;
    }


  await $.ajax({
    url: geoNamesApiUrl,
    type: "GET",
    dataType: "JSON",
    data: { action: 'findCapital', capital: capital },
    success: function (response) {
      let geonamesData;

      if (response["data"]["geonames"][0]) {
        geonamesData = response["data"]["geonames"][0];
      

      const latitude = geonamesData.lat;
      const longitude = geonamesData.lng;

      // Add a marker at the capital coordinates
      capitalMarker = L.marker([latitude, longitude],{ icon: customCapitalIcon })
        .addTo(map)
        .bindPopup(`<b>Capital: ${capital}`)
        .openPopup();
      
        map.setView([latitude, longitude], 6);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error finding capital data:", textStatus, errorThrown);
      console.log("Raw Server Response:", jqXHR.responseText);
    },
  });
}


});

// Function to capitalizeFirstLetter - used for fcodeName in addMarkers function
function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

var defaultImages = [
  "./images/1.jpg", "./images/2.jpg", "./images/3.jpg", "./images/4.jpg", "./images/5.jpg"
];
/* -------------------------------------- NEWS MODAL - UPDATE AND DISPLAY ----------*/
// Update and display news modal
function updateAndDisplayNewsModal(newsData) {

  var defaultImageIndex = 0;

  if (newsData.error) {
      console.log(newsData.error);
      showModal('News Information', "<p>No news information available.</p>");
  } else {
   // Update content for each article
for (var i = 0; i < newsData.data.length; i++) {
  var article = newsData.data[i];
  var articleId = "article" + (i + 1);
  var articleImage = article.image || defaultImages[defaultImageIndex % defaultImages.length];

  // Update article title and description
  $("#" + articleId + "Title").text(article.title);
  $("#" + articleId + "Description").text(article.description);
  $("#article" + (i + 1) + "Image").attr("src", articleImage);
  //Full article link
  var articleLink = article.url ? `<a href="${article.url}" target="_blank">Full article</a>` : '';
  $("#article" + (i + 1) + "Link").html(articleLink);

  // Increment default image index if a default image was used
  if (!article.image) {
    defaultImageIndex++;
  }
}

    // Show the modal
    $('#newsModal').modal('show');
  }
}


// Fetch and display news information
async function fetchAndDisplayNews() {
  var selectedOption =
    document.getElementById("countrySelect").options[
    document.getElementById("countrySelect").selectedIndex
    ];
  var country = selectedOption.dataset.iso;

  try {
    var newsResponse = await $.ajax({
      url: newsApiUrl,
      type: "GET",
      dataType: "JSON",
      data: { iso2: country },
    });

    updateAndDisplayNewsModal(newsResponse);
    console.log("newsResponse");
  } catch (error) {
    console.error("Error fetching news data:", error);
    hideNewsButton();
  }
}

// Function to hide the news button if there is no news information
function hideNewsButton() {
  $("#newsBtn").hide();
}

/*--------------------------------------------- UPDATE DEMOGRAPHICS --------------------------------*/
async function updateDemographicsModal(geonamesData) {
  // check to see if geonames have been received
  if (geonamesData) {
    currentLocation = geonamesData;

    let countryName = geonamesData["countryName"];
    let countryNameWithUnderscores = countryName.replaceAll(" ", "_");
    let countryCapital = geonamesData["capital"];
    let countryCapitalWithUnderscores = countryCapital.replaceAll(" ", "_");
    let countryPopulation = numeral(geonamesData["population"]).format('0,0');
    let countryContinentName = geonamesData["continentName"];
    let countryContinent = geonamesData["continent"];
    let countryIsoAlpha2 = geonamesData["countryCode"];
    let countryIsoAlpha3 = geonamesData["isoAlpha3"];
    let countryLanguages = geonamesData['languages'];
    let countryAreainSqKm = numeral(geonamesData["areaInSqKm"]).format(0, 0);
    let countryCurrencyCode = geonamesData["currencyCode"];
    let countryPostalCodeFormat = geonamesData["postalCodeFormat"] == "" ? "n/a" : geonamesData["postalCodeFormat"];
    $('#countryName').html(`<a href="https://en.wikipedia.org/wiki/${countryNameWithUnderscores}" target="_blank" title="View More Details for ${countryName}">${countryName}</a>`);
    $('#countryCapital').html(`<a href="https://en.wikipedia.org/wiki/${countryCapitalWithUnderscores}" target="_blank" title="View More Details for ${countryCapital}">${countryCapital}</a>`);   
    $('#countryPopulation').html(`${countryPopulation.toUpperCase()}`);
    $('#countryContinent').html(`${countryContinentName} (${countryContinent})`);
    $('#countryLanguages').html(`${countryLanguages}`);
    $('#countryIsoAlpha2').html(`${countryIsoAlpha2}`);
    $('#countryIsoAlpha3').html(`${countryIsoAlpha3}`);
    $('#countryAreaInSqKm').html(`${countryAreainSqKm}`);
    $('#countryCurrencyCode').html(`${countryCurrencyCode}`);
    $('#countryPostalCodeFormat').html(`${countryPostalCodeFormat}`);
    $('#countryFlag').html(`<img src="https://flagcdn.com/h60/${countryIsoAlpha2.toLowerCase()}.png">`);   
    $("#demographicsModal").modal("show");
  }
}

/*--------------------------------------------- GEONAME COUNTRY DATA --------------------------------*/
async function getGeonameDataFromCountry(country) {
  await $.ajax({
    url: geoNamesApiUrl,
    type: "GET",
    dataType: "JSON",
    data: { action: 'countryInfo', country: country },
    success: function (response) {
      
      if (response["data"]["geonames"][0]) {
        currentCountry = response["data"]["geonames"][0];
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error:", textStatus, errorThrown);
      console.log("Raw Server Response:", jqXHR.responseText);
    },
  });
}

/*--------------------------------------------- DEMOGRAPHICS --------------------------------*/
async function fetchAndDisplayDemographics() {
  var selectedOption =
    document.getElementById("countrySelect").options[
      document.getElementById("countrySelect").selectedIndex
    ];
  var country = selectedOption.dataset.iso;
  await $.ajax({
    url: geoNamesApiUrl,
    type: "GET",
    dataType: "JSON",
    data: { action: 'countryInfo', country: country },
    success: function (response) {
      let geonamesData;

      if (response["data"]["geonames"][0]) {
        geonamesData = response["data"]["geonames"][0];
      }

      updateDemographicsModal(geonamesData);
      $("#demographicsModal").modal("show");    
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error fetching and displaying Demographics data:", textStatus, errorThrown);
      console.log("Raw Server Response:", jqXHR.responseText);
    },
  });
}

/*--------------------------------------------- MARKERS --------------------------------*/
async function getFeatureMarkers(currentCountry) {
  // Clear existing markers
  capitalMarker = []
  shopMapMarkers = [];
  airportMapMarkers = [];
  forestMapMarkers = [];
  parkMapMarkers = [];

  // Ensure that all asynchronous calls are awaited using Promise.all
  await Promise.all(markers.map(async (markerInfo) => {
    let marker = markerInfo.featureCode;
    let overlayLayer = markerInfo.overlayLayer;

    try {
      let response = await $.ajax({
        url: geoNamesApiUrl,
        type: "GET",
        dataType: "JSON",
        data: { action: 'findMarkers', country: currentCountry.countryCode, marker: marker },
      });
  
      for (let j = 0; j < response['data']['geonames'].length; j++) {
        let geonameMarker = response["data"]["geonames"][j];

        // Push the markers to their respective array
        if (overlayLayer === "shopMarkers") {
          shopMapMarkers.push(geonameMarker);
        } else if (overlayLayer === "airportMarkers") {
          airportMapMarkers.push(geonameMarker);
        } else if (overlayLayer === "forestMarkers") {
          forestMapMarkers.push(geonameMarker);
        } else if (overlayLayer === "parkMarkers") {
          parkMapMarkers.push(geonameMarker);
        }
      }
    } catch (error) {
      console.error("Error fetching markers:", error);
      console.log("Raw Server Response:", error.responseText);
    }
  }));
}

async function addFeatureMarkersToMap() {
  // Remove existing marker clusters
  map.removeLayer(markerClusters);
  markerClusters.clearLayers();

  shopMarkers.clearLayers();
  airportMarkers.clearLayers();
  forestMarkers.clearLayers();
  parkMarkers.clearLayers();

  // Add Shop Markers
  shopMapMarkers.forEach(markerData => {
    addMarkers(markerData, shopMarkers, customShopIcon);
});

// Add Airport Markers
airportMapMarkers.forEach(markerData => {
    addMarkers(markerData, airportMarkers, customPlaneIcon);
});

// Add Forest Markers
forestMapMarkers.forEach(markerData => {
    addMarkers(markerData, forestMarkers, customForestIcon);
});

// Add Park Markers
parkMapMarkers.forEach(markerData => {
    addMarkers(markerData, parkMarkers, customParkIcon);
});

// Add each marker cluster group to the map
map.addLayer(shopMarkers);
map.addLayer(airportMarkers);
map.addLayer(forestMarkers);
map.addLayer(parkMarkers);
}

// Function to disable an overlay layer in the legend
function disableOverlayLayer(layerName) {
  // Find the checkbox for the given layer name and disable it
  $(`input[name='${layerName}']`).prop("disabled", true);

  // Change the layer name to indicate that there are no items to show
  $(`label[for='${layerName}']`).text(`No ${layerName} To Show`);
}

/* --------------------------------------------- WIKIPEDIA  --------------------------------*/
// Update and display Wikimedia modal
function updateAndDisplayWikimediaModal(response) {
  info = response["data"]["geonames"];

  // Update content for each article
  for (var i = 0; i < info.length; i++) {
      var article = info[i];
      var articleId = "wikimediaArticle" + (i + 1);

      // Update article title, summary, and URL
      $("#" + articleId + "Title").text(article.title);
      $("#" + articleId + "Summary").text(article.summary);
      $("#" + articleId + "Url").attr("href", 'https://' + article.wikipediaUrl).text(article.wikipediaUrl);
  }
  // Show the modal
  $('#wikimediaModal').modal('show');
}

// Fetch and display Wikimedia information
function getWikimedia() {
  var country = currentCountry.capital;

  $.ajax({
      url: wikimediaApiUrl,
      type: "GET",
      dataType: "JSON",
      data: { country: country },
      success: function (response) {
          updateAndDisplayWikimediaModal(response);
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error fetching Wikipedia data:", textStatus, errorThrown);
          console.log("Raw Server Response:", jqXHR.responseText);
      },
  });
}

/*-------------------------------------------- WEATHER --------------------------------*/
// Fetch and display weather information for the capital
async function getWeather() {

  let capital = currentCountry.capital;
  let countryName = currentCountry.countryName; 
 
  console.log("Capital:", capital, "Country:", countryName);
  if (!countryName || !capital) {
    console.error('Country name or capital is undefined');
    return;
}

  updateModalTitle(countryName, capital);

  await $.ajax({
    url: geoNamesApiUrl,
    type: "GET",
    dataType: "JSON",
    data: { action: 'findCapital', capital: capital },
    success: function (response) {
      let geonamesData;

      if (response["data"]["geonames"][0]) {
        geonamesData = response["data"]["geonames"][0];

      var country = {
        latlng: {
          lat: geonamesData.lat,
          lon: geonamesData.lng
        }
      };
      getWeatherInformation(country, capital);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error finding Weather data:", textStatus, errorThrown);
      console.log("Raw Server Response:", jqXHR.responseText);
    },
  });
}

function updateModalTitle(countryName, capital) {
  const modalTitle = `${countryName} - ${capital}`;
  document.getElementById('weatherModalLabel').textContent = modalTitle;
}

// Function to fetch weather information
async function getWeatherInformation(position, capital) {

  var lat = position.latlng.lat;
  var lon = position.latlng.lon;

  await $.ajax({
    url: weatherApiUrl,
    type: "GET",
    dataType: "JSON",
    data: { action: 'forecast', capital: capital },
    success: function (weatherResponse) {

        // Parse weather data
        var weatherData = weatherResponse.data;

        console.log(weatherData);
        $('#weatherModal').modal('show');
        displayWeatherData(weatherData, 0, 'today'); // Today's weather
        displayWeatherData(weatherData, 1, 'tomorrow'); // Tomorrow's weather
        displayWeatherData(weatherData, 2, 'dayAfter'); // Day after tomorrow's weather

        $('#weatherModal').modal('show');

    },
    error: function (xhr, status, error) {
      console.error("Error fetching weather data:", error);
      console.log("Raw Weather Response:", xhr.responseText);
    },
  });
}

// Function to display weather data
function displayWeatherData(weatherData, dayOffset, prefix) {
  const index = dayOffset * 8; 
  const weatherForDay = weatherData.list[index];

  if (!weatherForDay) {
    console.error('No weather data available for', prefix);
    return;
  }
  console.log(prefix, weatherForDay); 
  const date = new Date(weatherForDay.dt * 1000);
  const formattedDate = date.toString('dd/MM'); // Using Datejs for formatting
  const weatherDescription = weatherForDay.weather[0].description; 
  const temp = numeral(weatherForDay.main.feels_like).format('0.0');
  const maxTemp = numeral(weatherForDay.main.temp_max).format('0.0');
  const minTemp = numeral(weatherForDay.main.temp_min).format('0.0');
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherForDay.weather[0].icon}.png`;

  document.getElementById(`${prefix}Date`).textContent = formattedDate;
  document.getElementById(`${prefix}Icon`).src = weatherIconUrl;
  document.getElementById(`${prefix}WeatherDescription`).textContent = weatherDescription;
  document.getElementById(`${prefix}FeelsLike`).textContent = temp;
  document.getElementById(`${prefix}MaxTemp`).textContent = maxTemp;
  document.getElementById(`${prefix}MinTemp`).textContent = minTemp;
}


/*--------------------------------------------- EXCHANGE RATE --------------------------------*/
// Initialize exchange rates object
var exchangeRates = {};

// Function to fetch and display exchange rate information
async function getExchangeRates() {
  showLoader();
  await $.ajax({
    url: exchangeDataApiUrl,
    type: 'GET',
    dataType: 'json',
    data: { action: 'currencyName' },
    success: function (result) {
      
      countryCurrencyNames = result.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(JSON.stringify(jqXHR));
      console.log(JSON.stringify(textStatus));
      console.log(JSON.stringify(errorThrown));
    }
  });

  await $.ajax({
    url: exchangeDataApiUrl,
    type: 'GET',
    dataType: 'json',
    data: { action: 'currencyRate' },
    success: function (result) {

      if (result.status.name == "ok") {
        
        $('#currencyFrom').text(currentCountry.currencyCode);
        // Extract exchange rates from response data
        var rates = result.data.rates;

        // Populate the exchangeRates object
        for (var currencyCode in rates) {
          var rate = rates[currencyCode];
          exchangeRates[currencyCode] = {
            currencyCode: currencyCode,
            rate: rate
          };
        }
        // Populate the select dropdown with currency options
        var selectDropdown = $('#fromCurrencySelect');
        selectDropdown.empty(); // Clear previous options

        for (var currencyCode in countryCurrencyNames) {
          var currencyName = countryCurrencyNames[currencyCode];
          selectDropdown.append(`<option value="${currencyCode}">${currencyName} (${currencyCode})</option>`);
        }

        // Add change event listener to dynamically added options
        selectDropdown.on('change', function () {
          var selectedCurrencyCode = $(this).val();
          var selectedCountryName = countryCurrencyNames[selectedCurrencyCode];

          $('#currentCurrencyDropdown').text(`${selectedCountryName}  (${selectedCurrencyCode})`);
          $('#currentCurrencyDropdown').data('currency-code', selectedCurrencyCode);

          // Update the exchange rate when the currency is changed
          updateExchangeRate();
        });

        // Get current exchange rate for the initially selected currency
        getCurrentExchangeRate();
      } else {
        console.error("Error fetching exchange rate data:", result.status.name);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(JSON.stringify(jqXHR));
      console.log(JSON.stringify(textStatus));
      console.log(JSON.stringify(errorThrown));
    }
  });
  hideLoader();
}


// Function to update the exchange rate and recalculate when the "Exchange currency from" is changed
function updateExchangeRate() {
  
  // Update the exchange rate when the currency is changed
  var currentCurrencyCode = $('#fromCurrencySelect').val();
  var amountToExchange = parseFloat($('#amountToExchange').val());
  var toCurrencyCode = currentCountry.currencyCode;

  // Check if exchange rates are available
  if (!exchangeRates[currentCurrencyCode] || !exchangeRates[toCurrencyCode]) {
    alert('Exchange rates not available for selected currencies.');
    return;
  }

  console.log(exchangeRates[currentCurrencyCode].rate);

  // Calculate the exchange rate
  var exchangeRate = exchangeRates[currentCurrencyCode].rate;

  // Calculate the exchanged amount
  var exchangedAmount = amountToExchange * exchangeRate;

  // Display the result in the modal
  $('#exchangeResult').text('Result: ' + exchangedAmount.toFixed(2));
}

$(document).on('change', '#amountToExchange', function () {
  updateExchangeRate();
});

// Event listener for the "Select Currency to Exchange From" dropdown change
$(document).on('change', '#fromCurrencySelect', function () {
  // Update the exchange rate when the currency is changed
  updateExchangeRate();
});


// Event listener for the new button to show the exchange rate modal
$(document).on('click', '#showExchangeRateButton', function () {
  $('#exchangeRateModal').modal('show');
});


function getCurrentExchangeRate() {

  // Get selected country option
  var selectedOption = document.getElementById("countrySelect").options[document.getElementById("countrySelect").selectedIndex];
  var country = selectedOption.dataset.iso

  $.ajax({
    url: geoNamesApiUrl,
    type: 'GET',
    dataType: 'JSON',
    data: { action: 'countryInfo', country: country },
    success: function (response) {
      let geonamesData;

      if (response['data']['geonames'][0]) {
        geonamesData = response['data']['geonames'][0];
      }

      let countryName = geonamesData['countryName'];
      let currentCurrencyCode = geonamesData['currencyCode'];
      let currentExchangeRate = exchangeRates[currentCurrencyCode].rate;
      let toExchangeRate = exchangeRates['GBP'].rate;

      // Update modal content
      $('#modalCountryName').text(countryName);
      $('#modalCurrentCurrencyCode').text(currentCurrencyCode);
      $('#modalCurrentExchangeRate').text(currentExchangeRate);
      $('#modalToExchangeRate').text(toExchangeRate);

      // Populate the currency dropdown with options
     // populateCurrencyDropdown(exchangeRates);

      // Show the modal
      $('#exchangeRateModal').modal('show');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error fetching geonames data:", textStatus, errorThrown);
      console.log("Raw Server Response:", jqXHR.responseText);
    },
  });
}

// Function to fetch and display the exchange rate from GBP to USD
function showExchangeRate() {

  $.ajax({
    url: exchangeDataApiUrl,
    method: 'GET',
    success: function (response) {
      if (response.status.code === '200') {
        // Extract currency rates from the API response
        var exchangeRates = response.data.rates;

        // Get the exchange rate from GBP to USD
        var gbpToUsdRate = exchangeRates['USD'] / exchangeRates['GBP'];

        // Display the exchange rate
        $('#exchangeRate').text('1 GBP = ' + gbpToUsdRate.toFixed(4) + ' USD');
      } else {
        console.error('Error fetching exchange rates:', response.status.description);
      }
    },
    error: function (error) {
      console.error('Error fetching exchange rates:', error);
    }
  });
}
