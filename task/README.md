# Kristi Jaerve - IT Career Switch

Full-Stack Web and Software Developer Course - Step 3 Task

Live application: [https://kristijaerve.co.uk/task/](https://kristijaerve.co.uk/task/ "Link to the live application")

## Objective:

* Create a simple HTML table which would connect to three APIs from the list at [GeoNames WebServices](https://www.geonames.org/export/ws-overview.html) to add into the app.

  > The table would contain three columns:
  >
  > * API Name.
  > * API Description with user input fields.
  > * Submit button.
  >
* The app should be able to connect to the GeoNames Webservices API and based on the user's input, show the output in the "Results" row of the Table.
* Host the app to a website and add to GitHub.

### Actions taken:

* Installed and learned how to use XAMPP
* Enabled API access to the GeoNames account
* Used HTML, PHP,  jQuery, AJAX, cURL and CSS to code the application.
* Error logs created for incorrect input or connection errors on the application.
* Small stylization given to the application.
* Signed up for webhosting and uploaded the application - [https://kristijaerve.co.uk/task/](https://kristijaerve.co.uk/task/ "Link to the live &quot;Task&quot; application&quot;&quot;")

### API's chosen for the application:

1. **Postal Code Lookup:**

Webservice Type : REST /JSON
Url : api.geonames.org/postalCodeLookupJSON?
Parameters : postalcode,country ,maxRows (default = 20),callback, charset (default = UTF-8)
Result : returns a list of places for the given postalcode in JSON format, sorted by postalcode,placename

Example [http://api.geonames.org/postalCodeLookupJSON?postalcode=6600&amp;country=AT&amp;username=demo](http://api.geonames.org/postalCodeLookupJSON?postalcode=6600&country=AT&username=demo)

2. **Weather Stations with most recent Weather Observation:**

Webservice Type : REST
Url : api.geonames.org/weatherJSON?
Parameters :
north,south,east,west : coordinates of bounding box
callback : name of javascript function (optional parameter)
maxRows : maximal number of rows returned (default = 10)

Result : returns a list of weather stations with the most recent weather observation

Example [http://api.geonames.org/weatherJSON?north=44.1&amp;south=-9.9&amp;east=-22.4&amp;west=55.2&amp;username=demo](http://api.geonames.org/weatherJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=demo)

3. **Timezone:**

Webservice Type : REST
Url : api.geonames.org/timezone?
Parameters : lat,lng, radius (buffer in km for closest timezone in coastal areas),lang (for countryName), date (date for sunrise/sunset);
Result : the timezone at the lat/lng with gmt offset (1. January) and dst offset (1. July)

Example [http://api.geonames.org/timezone?lat=47.01&amp;lng=10.2&amp;username=demo](http://api.geonames.org/timezone?lat=47.01&lng=10.2&username=demo)

This service is also available in JSON format : [http://api.geonames.org/timezoneJSON?lat=47.01&amp;lng=10.2&amp;username=demo](http://api.geonames.org/timezoneJSON?lat=47.01&lng=10.2&username=demo)
