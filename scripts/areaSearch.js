// Case 1: User not is logged in
// Case 2: User is logged in

var isLoggedIn = false;

// Step 1. Get user location
// Step 2. API call for best rated restaurants in that area --> "best restaurants in my area"
// Step 3. Count Restaurant Query
// Step 4. Put Data into cards

function userSearch(loggedIn) {
    if (loggedIn) {
        console.log('User is logged in')
    }
    else {
        console.log('User is not logged in')
        getLocation()
    }
}

function getLocation() {

    // if (navigator.geolocation && cookieExists("lat-lng")) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setGeoCookie, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function setGeoCookie(position) {
    var cookie_val = position.coords.latitude + "|" + position.coords.longitude;
    const d = new Date();

    // Set cookie to expire after a week
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));

    let expires = "expires=" + d.toUTCString();
    document.cookie = "lat_lng=" + cookie_val + ";" + expires;
    showPosition(position)
}

// TODO: Determine if needed
// Check if a cookie with that name exists
function cookieExists(name){
    let cookies = document.cookie.split(';')
    for(var c in cookies) {
        if(name === c.split("=")[0]) {
            return true;
        }
    }
    return false;
}

function showPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude)
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function searchBestInArea() {
    var coords = document.cookie.split(";")[0].split("=")[1].split("|")
    var lat = coords[0]
    var long = coords[1]

    
}