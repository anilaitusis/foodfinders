var params = window.location.search.split("&")
var place_id = params[0].split("=")[1]

var map
var infowindow
var service

function initMap() {
    let mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 12
    }

    map = new google.maps.Map(document.getElementById("map"), mapOptions)
    infowindow = new google.maps.InfoWindow();
    placeSearch(params[0].split("=")[1])
}

function placeSearch(id) {

    let request = {
        placeId: id
    }

    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);
}

function callback(place, status) {
    console.log(status)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        map.setCenter({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
        createMarker(place);
        $("#info-window").html("<h1>" + place.name + "<h1>")
        if(place.photos){
            $(".splash").css("background-image", "url(" + place.photos[0].getUrl() + ")");
        }
        setPlaceInfo(place)
        console.log(place)
    }
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });

    // TODO: Highlight markers when on a specific page on the slides
    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name + "<br>" + place.vicinity);
        infowindow.open(map, marker);
        map.panTo(marker.getPosition());
    });
}

function setPlaceInfo(place) {
    place.opening_hours.weekday_text.forEach((day) => {
        $(".opening-hours").append("<p>" + day + "<p>")
    })

    for(let i = 0; i < place.price_level; i++) {
        $(".price").append("$")
    }
    $(".rating").html("<p> Avg Rating: " + place.rating + "<p>")
    $(".vicinity").html("<p>" + place.formatted_address+ "<p>")

    place.reviews.forEach((review) => {
        let review_ = $("<div>", { "class": "review-card"})
        $(review_).append("<h4>" + review.author_name + "<h4>")
        $(review_).append("<h5>Rating: " + review.rating + "<h5>")
        $(review_).append("<p>" + review.text + "<p>")
        $(review_).append("<hr>")
        $(".reviews").append(review_)
    })
}

/*
Notes: 
- Place has a gallery. Use photos[i].getUrl() for the url
- Place has time open til. Use opening_hours.periods[day].open/close.hours/minutes for the time
    - alternatively, use opening_hours.weekday_text[day] to get formatted response of open hours
- Place has price level, which indicates ($$$$). Use .price_level
- Place has rating. Use .rating
- Place has reviews. Use .reviews[i] to access review
    - .author_name
    - .profile_photo_url
    - .rating
    - .relative_time_description
    - .text
- Place has vicinity for address. Use .vicinity
*/