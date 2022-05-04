// Case 1: User not is logged in
// Case 2: User is logged in

var isLoggedIn = false;
var coords
var map
var service
var all_results
var same_coords

// Step 1. Get user location 
// Step 2. API call for best rated restaurants in that area --> "best restaurants in my area"
// Step 3. Count Restaurant Query
// Step 4. Put Data into cards

function initMap() {
    let mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 12
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions)
    initAutoComplete("#zipcode")
    initAutoComplete("#zipcode2")
    userSearch()
}


// Check if user is logged in
function userSearch() {
    if (isLoggedIn) {
        console.log('User is logged in')
        // Log in stuff
    }
    else {
        console.log('User is not logged in')
        cookieExists()
        // getLocation()    //Remove Comment
    }
}


// Step 1. Get user location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setGeoCookie, showError);
    } else {
        // TODO: Edit this for later
        console.log("Geolocation is not supported by this browser.");
    }
}

function setGeoCookie(position) {
    const cookie_val = position.coords.latitude + "|" + position.coords.longitude;
    console.log(cookie_val)
    // If cookie exists, check if the same
    // if (getCookie("lat_lng") === cookie_val && existsInStorage("best")) {
    //     console.log("User is in the same location")
    //     all_results = loadLastResults("best", true)
    //     fillSliders(all_results, "#recommended")
    // }
    // else {
    const d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set cookie to expire after a week
    let expires = "expires=" + d.toUTCString();
    document.cookie = "lat_lng=" + cookie_val + ";" + expires;

    searchBestInArea(position)


    showPosition(position)
}

function showPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude)
}

function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}
// TODO: Determine if needed
// Check if a cookie with that name exists and 
// if do reload best in your area json
function cookieExists(name) {
    let cookies = document.cookie.split(';')
    for (var c in cookies) {
        if (name === c.split("=")[0]) {
            return true;
        }
    }
    return false;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
            break;
    }
}

function searchBestInArea(position) {
    coords = position
    const query = "best+restaurants+in+my+area"

    let service = new google.maps.places.PlacesService(map);
    let request = {
        location: { lat: position.coords.latitude, lng: position.coords.longitude },
        radius: '8000',
        keyword: query,
        type: ['restaurant'],
        rankby: google.maps.places.RankBy.PROMINENCE
    }
    service.nearbySearch(request, callback)
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        all_results = results
        fillSliders(results, "#recommended")
        // storeResultsLocally("best", results, true)
    }
    // If there are no search results
    // TODO: Add Results not found page
    else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        console.log("No results found!")
    }
}