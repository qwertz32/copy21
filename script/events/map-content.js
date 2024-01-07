var map, currentLayer, initialCoordinates, initialZoom;

$(document).ready(function () {
    initialZoom = parseFloat(storedZoom) || presetZoom;
    initialCoordinates =

        map = L.map('map', {
            zoomControl: false,
            animate: true,
            duration: 1, 
            easeLinearity: 0.25,
            zoomSnap: 0.20,
            zoomDelta: 0.75
        }).setView(initialCoordinates, initialZoom);

    var cartodbDark = L.tileLayer('https://cartodb-basemaps-c.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        minZoom: 2.5,
        animate: true,
        duration: 1, 
        easeLinearity: 0.25,
        bounceAtZoomLimits: false,
        maxZoom: 21,
        attribution: 'CartoDB',
        preload: Infinity,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        keepBuffer: 5
    });

    var weatherLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 22,
        animate: true,
        duration: 1, 
        easeLinearity: 0.25,
        attribution: 'Apple Maps',
        preload: Infinity,
        keepBuffer: 5
    });

    var baseMaps = {
        "Google Maps": cartodbDark,
        "Weather": weatherLayer
    };

    cartodbDark.addTo(map);

    map.on('moveend', function () {
        try {
            var currentCoordinates = map.getCenter();
            var currentZoom = map.getZoom();
            localStorage.setItem('mapCoordinates', JSON.stringify(currentCoordinates));
            localStorage.setItem('mapZoom', currentZoom.toString());
        } catch (error) {
            console.error("Cannot write into Local Storage");
        }
    });

    currentLayer = cartodbDark;

    function switchLayer() {
        if (currentLayer === cartodbDark) {
            map.removeLayer(cartodbDark);
            weatherLayer.addTo(map);
            currentLayer = weatherLayer;
        } else {
            map.removeLayer(weatherLayer);
            cartodbDark.addTo(map);
            currentLayer = cartodbDark;
        }
    }
});

