/// <reference path="jquery-2.2.3.js" />

$(document).ready(function () {
    getLocation();
});

function getLocation() {
    if (supportsGeolovation) {
        var options = { enableHighAccuracy: true };
        witchId = navigator.geolocation.getCurrentPosition(showPosition, showError, options);
    } else {
        showMessage("GeoLocation is not supported by this Browser");
    }
}

function supportsGeolovation() {
    // in operator is used to Know is the Object has the property defined
    return 'geolocation' in navigator;
}


var map;
var service;


function showPosition(position) {
    var mapCanvas = document.getElementById('map');
    var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var options = { zoom: 13, center: coords, mapTypeControl: true, navigationControlOption: { style: google.maps.NavigationControlStyle.SMALL }, mapTypeId: google.maps.MapTypeId.ROADMAP };

    map = new google.maps.Map(mapCanvas, options);

    //This is your current location
    var marker = new google.maps.Marker({ position: coords, map: map, title: "You are here!" });

    service = new google.maps.places.PlacesService(map);
    google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
}



// search all burguer Kings
function performSearch() {
    var request = {
        bounds: map.getBounds(),
        keyword: 'burger king'
    };
    service.radarSearch(request, handleSearchResult);
}

// takes all the burgerKings and display them in the map
function handleSearchResult(results, status) {
    //if (status == google.maps.places.PlacesService.OK) {
        for (var i = 0; i < results.length; i++) {
            var marker = new google.maps.Marker({ position: results[i].geometry.location, map: map, icon: 'icon/Diamond.png' });
        //}
    }
}


function showMessage(message) {
    $('#message').html(message);
}

function showError(error) {

    switch (error.code) {
        case error.PERMISSION_DENIED:
            showMessage("User dinied Geolocation access request.");
            break;
        case error.POSITION_UNAVAILABLE:
            showMessage("Location information unavailable.");
            break;
        case error.TIME_OUT:
            showMessage("Get user location request time out.");
            break;
        case error.UNKNOWN_ERROR:
            showMessage("An unknown error ocurred.");
            break;
    }
}

