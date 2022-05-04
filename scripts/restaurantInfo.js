var params = window.location.search.split("&")
var place_id = params[0].split("=")[1]

var map
var service

function initMap() {
    let mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 12
    }

    map = new google.maps.Map(document.getElementById("map"), mapOptions)
    console.log("1")
    placeSearch(params[0].split("=")[1])
}

function placeSearch(id) {
    
    let request = {
        placeId: id
    }
    console.log("2")
    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);
}

function callback(place, status) {
    console.log(status)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    //   createMarker(place);
      console.log(place)
    }
  }