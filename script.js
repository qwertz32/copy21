document.addEventListener('DOMContentLoaded', function () {
    // Show the button when JavaScript is enabled
    var button = document.querySelector('.btn');
    button.style.display = 'block';
    button.style.visibility = 'visible';
});

var map;
var tileLayerUrl = 'https://mt3.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}';
var presetCoordinates = [27.386445836446814, 15.59099952979347];
var presetZoom = 3;

var initialCoordinates, initialZoom;

var google = L.tileLayer('https://mt2.google.com/vt?lyrs=s,h&z={z}&y={y}&x={x}', {
    maxZoom: 22,
    attribution: 'Google Maps',
    preload: Infinity,
    keepBuffer: 5
});

var apple = L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=eDxCCaW34dfWTOSbwEO80BxuckHdpCMCRTfkVEpSiVwvxMRrOahK2Kuj7uUFy8A4', {
    maxNativeZoom: 20,

    attribution: 'Unspecified Maps', 
    preload: Infinity,
    keepBuffer: 5
});

// var maptiler = L.titleLayer('')
var baseMaps = {
    "Google Maps": google,
    "Apple Maps": apple
};

try {
    var storedCoordinates = localStorage.getItem('mapCoordinates');
    var storedZoom = localStorage.getItem('mapZoom');
    // try to get the cache but if not possible, go to the default values presetCoordinates and presetZoom, leave it in this state.
    initialCoordinates = JSON.parse(storedCoordinates) || presetCoordinates;
} catch (error) {
    console.error(
        "Error getting the last position. \n Fix is most likely to %cenable cache%c. \n If this does not help, contact the owner and provide any other error you get.",
        "color: #e30505; font-weight: bold; text-decoration: underline;",
        "color: orange; font-weight: normal;"
      );
        initialCoordinates = presetCoordinates;
}

initialZoom = parseFloat(storedZoom) || presetZoom;

map = L.map('map', { zoomSnap: 0.45, zoomDelta: 0.75 }).setView(initialCoordinates, initialZoom);

map.removeControl(map.zoomControl);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

google.addTo(map); 

map.on('moveend', function () {
    var currentCoordinates = map.getCenter();
    var currentZoom = map.getZoom();
    localStorage.setItem('mapCoordinates', JSON.stringify(currentCoordinates));
    localStorage.setItem('mapZoom', currentZoom.toString());
});

// Keep track of the current layer
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
}

var btn = document.querySelector('.btn');
var options = document.querySelector('.options');
var hideTimeout;

btn.addEventListener('mouseover', function () {
    options.style.display = 'flex';
});

btn.addEventListener('mouseout', function () {
    // Set a timeout to hide options after 700 milliseconds
    hideTimeout = setTimeout(function () {
        options.style.display = 'none';
    }, 300);
});

options.addEventListener('mouseover', function () {
    // Clear the timeout if the user hovers over options again
    clearTimeout(hideTimeout);
    options.style.display = 'flex';
});

options.addEventListener('mouseout', function () {
    // Set a timeout to hide options after 700 milliseconds
    hideTimeout = setTimeout(function () {
        options.style.display = 'none';
    }, 300);
});