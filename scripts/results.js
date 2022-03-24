var APIKEY = "AIzaSyAi2P_fe95Y9Ee4FvXtKErVt9OF_pfPGgs"
var query = JSON.parse(localStorage.getItem("query"))
var food = query.cuisine
var zipcode = query.zipcode


// Set on search bar

var map;
var geocoder;
var infowindow;


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();

    // geocodeLatLng(geocoder, map, infowindow);
    codeAddress(zipcode)
}

// Geocoding - Look up lat/long from address
function codeAddress(address) {
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            const search_coord = results[0].geometry.location
            nearbySearch(search_coord)
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

var data

function nearbySearch(search_coord) {
    // Nearby Search
    const latlng = search_coord.lat() + "%2C" + search_coord.lng()
    const radius = 8000
    var URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=" + food + "&location=" + latlng + "&radius=" + radius + "&type=restaurant&key=" + APIKEY

    // temp = fetchAsync(URL)
    const proxyurl = "https://cors-anywhere.herokuapp.com/" + URL;

    var config = {
        method: 'get',
        url: proxyurl,
        headers: {}
    };

    // IMPORTANT! DO NOT FORGET TO INCLUDE WITH AXIOS REQUESTS
    delete axios.defaults.headers.common["Authorization"];

    axios(config)
        .then(function (response) {
            data = response.data
            // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });



    var searchbar = document.getElementById("results")

    searchbar.innerHTML +=
        "<br>" + query.zipcode
        + "<br>" + query.cuisine
        + "<br>" + search_coord.lat() + " " + search_coord.lng()
}






