var mapProviders;

document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.btn');
    button.style.cssText = 'display:block;visibility:visible;';
    fetch('sources.json')
        .then(r => r.json())
        .then(data => callMapSources(data))
        .catch(error => console.error('Error fetching sources. ', error));
});

function callMapSources(mapSources) {
    mapProviders = mapSources;
}

function changeMap(provider, mapType) {
    if (mapProviders && mapProviders[provider]) {
        var mapUrl = mapProviders[provider][mapType];
        if (mapUrl) {
            map.removeLayer(currentLayer);
            var newLayer = L.tileLayer(mapUrl, { maxZoom: 18, attribution: '' });
            newLayer.addTo(map);
            currentLayer = newLayer;
            console.log(`Changed to ${provider} - ${mapType}`);
        } else {
            console.error(`Map type ${mapType} not found for ${provider}`);
        }
    } else {
        console.error(`Provider ${provider} not found.`);
    }
}

var map, currentLayer;
var tileLayerUrl = 'https://mt3.google.com/vt?lyrs=s&x={x}&y={y}&z={z}';
var presetCoordinates = [27.386445836446814, 15.59099952979347];
var presetZoom = 3;
var initialCoordinates, initialZoom;

var google = L.tileLayer('https://{s}.google.com/vt?lyrs=s&z={z}&y={y}&x={x}', {
    maxZoom: 21,
    maxNativeZoom: 18,
    attribution: '© Google Maps',
    preload: Infinity,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    keepBuffer: 5
});

var apple = L.tileLayer('https://cartodb-basemaps-c.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
    maxZoom: 22,
    attribution: 'Unspecified Maps', 
    preload: Infinity,
    keepBuffer: 5
});

var baseMaps = { "Google Maps": google, "Apple Maps": apple };

try {
    var storedCoordinates = localStorage.getItem('mapCoordinates');
    var storedZoom = localStorage.getItem('mapZoom');
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
L.control.zoom({ position: 'bottomright' }).addTo(map);

google.addTo(map); 

map.on('moveend', function () {
    var currentCoordinates = map.getCenter();
    var currentZoom = map.getZoom();
    localStorage.setItem('mapCoordinates', JSON.stringify(currentCoordinates));
    localStorage.setItem('mapZoom', currentZoom.toString());
});

currentLayer = google;

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
    options.style.cssText = 'display:flex;';
});

btn.addEventListener('mouseout', function () {
    hideTimeout = setTimeout(function () {
        options.style.display = 'none';
    }, 300);
});

options.addEventListener('mouseover', function () {
    clearTimeout(hideTimeout);
    options.style.cssText = 'display:flex;';
});

options.addEventListener('mouseout', function () {
    hideTimeout = setTimeout(function () {
        options.style.display = 'none';
    }, 300);
});
