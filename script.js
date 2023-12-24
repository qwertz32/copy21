var map;
    var tileLayerUrl = 'https://mt3.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}';
    var presetCoordinates = [27.386445836446814, 15.59099952979347];
    var presetZoom = 3;

    var initialCoordinates, initialZoom;

    var google = L.tileLayer('https://mt2.google.com/vt?lyrs=s,h&z={z}&y={y}&x={x}', {
        maxZoom: 22,
        attribution: 'Google Maps 2nd'
    })

    var apple = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 20,
        attribution: 'Apple Maps'
    })
    
    var baseMaps = {
        "1": google,
        "2": apple
    }
    
    try {
        var storedCoordinates = localStorage.getItem('mapCoordinates');
        var storedZoom = localStorage.getItem('mapZoom');
        // try to get the cache but if not possible, go to the deafult values presetCoordinations and presetZoom, leave it in this state.
        initialCoordinates = JSON.parse(storedCoordinates) || presetCoordinates;
    } catch (error) {
        console.error("Error getting the last position. \n Fix: \n Enable cache. \n If this does not help contact the owner and provide this error:", error);
        initialCoordinates = presetCoordinates;
    }

    initialZoom = parseFloat(storedZoom) || presetZoom;

    map = L.map('map', { zoomSnap: 0.30, zoomDelta: 0.75 }).setView(initialCoordinates, initialZoom);

    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    L.tileLayer(tileLayerUrl, {
        attribution: 'Deafult',
        maxZoom: 22,
        keepBuffer: 5,
        preload: Infinity,
    }).addTo(map);

    map.on('moveend', function() {
        var currentCoordinates = map.getCenter();
        var currentZoom = map.getZoom();
        localStorage.setItem('mapCoordinates', JSON.stringify(currentCoordinates));
        localStorage.setItem('mapZoom', currentZoom.toString());
    });

//Switching the map provider via console
function switchLayer(layerName) {
    for (var key in baseMaps) {
        map.removeLayer(baseMaps[key]);
    }
    baseMaps[layerName].addTo(map);
}
