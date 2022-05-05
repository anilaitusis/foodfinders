var params = window.location.search.split("&")
var query = params[0].split("=")[1].toLowerCase()
query = query.charAt(0).toUpperCase() + query.slice(1)
var zipcode = params[1].split("=")[1]

var map;
var geocoder;
var infowindow;
var service;
var address
var all_results

function initMap() {
    let mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 12
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions)

    geocoder = new google.maps.Geocoder()
    infowindow = new google.maps.InfoWindow();

    // TODO: Remove Geocoder and replace with localStorage
    initAutoComplete("#zipcode2")
    codeAddress(zipcode)
}

function codeAddress(address) {
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            address = results
            map.setCenter(results[0].geometry.location);
            search_coord = results[0].geometry.location
            nearbySearch(search_coord)
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function nearbySearch(latlng) {
    let request = {
        location: { lat: latlng.lat(), lng: latlng.lng() },
        radius: '8000',     // radius is measured in meters
        keyword: query,
        type: ['restaurant']
    }

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback)
    console.log("completed")

    $("#zipcode2").val(zipcode.replaceAll("+", ", "))
    $("#cuisine").val(query.replaceAll("+", " "))
}

function callback(results, status, pagination) {
    all_results = results
    console.log(status)
    // If there are search results
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        console.log(results)
        initVoting()
        fillSliders(results, "#swiper-container", query)
        // Create Markers
        for (let i = 0; i < results.length; i++) {
            createMarker(results[i], i);
        }
    }
    // If there are no search results
    // TODO: Add Results not found page
    else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        console.log("No results found!")
    }
}

function createMarker(place, i) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });

    // TODO: Highlight markers when on a specific page on the slides
    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent((i + 1) + ". " + place.name + "<br>" + place.vicinity);
        infowindow.open(map, marker);
        map.panTo(marker.getPosition());
    });
}

function initVoting() {
    if (getCookie("votes") === null || getCookie("votes") === undefined) {
        addCookie("votes", "{}", "string")
    }
    if (getCookie("votes").length > 5) {
        addCookie("votes", "{}", "string")
    }
}

// TODO: Implement voting system
function toggleNo(id){
    let votes = JSON.parse(getCookie("votes"))

    if(!votes.hasOwnProperty(id)) {
        votes[id] = "neutral"
    }

    if(votes[id] === "neutral" || votes[id] === "like"){
        votes[id] = "dislike"
    }
    else {
        votes[id] = "neutral"
    }

    addCookie("votes", votes, "obj")
    console.log(getCookie("votes"))
    // Change color of thumbs down
}

function toggleYes(id){
    let votes = JSON.parse(getCookie("votes"))

    if(!votes.hasOwnProperty(id)) {
        votes[id] = "neutral"
    }

    if(votes[id] === "neutral" || votes[id] === "dislike"){
        votes[id] = "like"
    }
    else {
        votes[id] = "neutral"
    }

    addCookie("votes", votes, "obj")
    console.log(getCookie("votes"))
    // Change color of thumbs down
}