

// var storedCoordinates, storedZoom;

google.addTo(map);

map.on('moveend', function() {
    var currentCoordinates = map.getCenter();
    var currentZoom = map.getZoom();
    localStorage.setItem('mapCoordinates', JSON.stringify(currentCoordinates));
    localStorage.setItem('mapZoom', currentZoom.toString());
});

var currentLayer = google;

function switchLayer() {
    if (currentLayer === google) {
        map.removeLayer(google);
        apple.addTo(map);
        currentLayer = apple;
    } else {
        map.removeLayer(apple);
        google.addTo(map);
        currentLayer = google;
    }
};



// $(".nav-logo").click(function() {
//     $(".nav-logo-popup").fadeToggle();
// });

// $(document).click(function (event) {
//     if (!$(event.target).closest('.nav-logo, .nav-logo-popup').length) {
//         $(".nav-logo-popup").fadeOut();
//     }
// });