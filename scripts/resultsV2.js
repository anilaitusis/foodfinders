var APIKEY = "AIzaSyAi2P_fe95Y9Ee4FvXtKErVt9OF_pfPGgs"
var params = window.location.search.split("&")
var query = params[0].split("=")[1]
var zipcode = params[1].split("=")[1]

var map;
var geocoder;
var infowindow;
var service;
var searchresults

function initMap() {
    let mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 10
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions)

    geocoder = new google.maps.Geocoder()
    infowindow = new google.maps.InfoWindow();

    // TODO: Remove Geocoder and replace with localStorage
    codeAddress(zipcode)
}

function codeAddress(address) {
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
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
        radius: '8000',
        keyword: query,
        type: ['restaurant']
    }

    service = new google.maps.places.PlacesService(map);
    // Nearby Search does not 
    service.nearbySearch(request, callback)
    console.log("completed")
    
    $("#zipcode2").val(zipcode)
    $("#cuisine").val(query.replaceAll("+", " "))
}

function callback(results, status) {
    
    console.log(status)
    // If there are search results
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        console.log(results)
        fillSliders(results)
        // Create Markers
        for (let i = 0; i < results.length; i++) {
            createMarker(results[i], i);
        }
    }
    // If there are no search results
    else if(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        console.log("No results found!")
    }
}

function fillSliders(results) {
    var iters = results.length

    if (results.length > 9) {
        iters = 9
    }

    // TODO: Implement dynamic adding to card sliders
    if (false){
        /*
        Slider Template
        - - - - - - - - -
        <div class="swiper-slide card">
            <div class="card-content" id="card-1">
                <div class="image">
                    <img src="" alt="">
                </div>

                <div class="name-profession">
                    <span class="name"></span>
                    <span class="address"></span>
                </div>

                <div class="rating" id="rating-1">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
            </div>
        </div>
        */
    }

    for (let i = 0; i < iters; i++) {
        if (results[i].photos) {
            // var reference = results[i].photos[0].photo_reference
            var src = results[i].photos[0].getUrl()
            $('#card-' + i + ' .image img').attr("src", src)
        }
        else {
            $('#card-' + i + ' .image img').attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png")
        }

        $('#card-' + i + ' .name-profession .name').text(results[i].name)
        console.log(results[i].name)
        $('#card-' + i + ' .name-profession .address').text(results[i].vicinity)

        var rating = Math.floor(results[i].rating)

        // Star Rating Update
        for (let j = 0; j < 5; j++) {
            // console.log(j + " " + rating)
            if (j < rating) {
                $('#rating-' + i + ":nth-child(" + (j + 1) + ")").addClass("fas")
                $('#rating-' + i + ":nth-child(" + (j + 1) + ")").removeClass("far")
            }
            else {
                $('#rating-' + i + ":nth-child(" + (j + 1) + ")").addClass("far")
                $('#rating-' + i + ":nth-child(" + (j + 1) + ")").removeClass("fas")
            }
        }
    }
}

function createMarker(place, i) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent((i + 1) + ". " + place.name + "<br>" + place.vicinity);
        infowindow.open(map, marker);
    });
}