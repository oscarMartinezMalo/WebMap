/// <reference path="jquery-2.2.3.js" />

$(document).ready(function () {
    getLocation();
});

function getLocation() {
    if (supportsGeolovation) {
        witchId = navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        showMessage("GeoLocation is not supported by this Browser");
    }
}

function supportsGeolovation() {
    // in operator is used to Know is the Object has the property defined
    return 'geolocation' in navigator;
}

function showPosition(position) {
   
    var mapCanvas = document.getElementById('message');
    var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
    var options = {
        zoom: 13,
        center: coords,
        mapTypeControl: false,
        navigationControlOption: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapCanvas, options); 
    var marker = new google.maps.Maker({
        position: coords,
        map: map,
        title:"You are here!"
    });
    
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

function showMessage(message) {
    $('#message').html(message);
}