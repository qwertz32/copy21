var map, currentLayer, initialCoordinates, initialZoom;

initialZoom = parseFloat(storedZoom) || presetZoom;
map = L.map('map', {
    zoomControl: false,
    zoomSnap: 0.20,
    zoomDelta: 0.75
}).setView(initialCoordinates, initialZoom);


var google = L.tileLayer('https://cartodb-basemaps-c.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
    minZoom: 2.5,
    // maxBounds: bounds,
    bounceAtZoomLimits: false,
    maxZoom: 21,
    attribution: 'Google Maps',
    preload: Infinity,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    keepBuffer: 5
});

var apple = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 22,
    attribution: 'Apple Maps',
    preload: Infinity,
    keepBuffer: 5
});
var baseMaps = {
    "Google Maps": google,
    "Apple Maps": apple
};
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
