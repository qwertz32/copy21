document.addEventListener('DOMContentLoaded', function () {

var mapProviders;
var mapHistory = [];
var maxHistoryLength = 10;

sourcesJson = '/sources.json';

document.addEventListener('DOMContentLoaded', function() {
    fetch(sourcesJson)
        .then(response => response.json())
        .then(data => {
            callMapSources(data);
        })
        .catch(error => {
            console.error('Error fetching sources. ', error);
        });
});

function callMapSources(mapSources) {
    mapProviders = mapSources; 
}
});

// Function to change the map layer
function changeMap(provider, mapType) {
// Check if the specified provider exists in the JSON data
if (mapProviders && mapProviders[provider]) {
    var mapUrl = mapProviders[provider][mapType];

    if (mapUrl) {
        // Store the current map provider before changing
        mapHistory.push(createLayerClone(currentLayer));

        // Limit the history length to maxHistoryLength
        if (mapHistory.length > maxHistoryLength) {
            mapHistory.shift(); // Remove the oldest entry
        }

        // Remove the current layer
        map.removeLayer(currentLayer);

        // Create a new layer with the specified URL
        var newLayer = L.tileLayer(mapUrl, {
            maxZoom: 18, // Adjust maxZoom based on the specific provider
            attribution: 'Custom Map Provider'
        });

        // Add the new layer to the map
        newLayer.addTo(map);
        currentLayer = newLayer;

        console.log(`Changed to ${provider} - ${mapType}`);
    } else {
        console.error(`Map type ${mapType} not found for ${provider}`);
    }
} else {
    console.error(`Provider ${provider} not found in the JSON data`);
}
}
// Function to return to the previous map provider
function mapReturn() {
if (mapHistory.length > 0) {
    // Remove the current layer
    map.removeLayer(currentLayer);

    // Get the last map provider from the history stack
    var previousLayer = mapHistory.pop();

    // Add the previous layer back to the map
    previousLayer.addTo(map);
    currentLayer = previousLayer;

    console.log(`Returned to the previous map provider`);
} else {
    console.error(`No previous map provider stored`);
}
}

function teleportTo(coordinates, zoom) {
if (!map) {
    console.error(error);
    return;
}

const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord.trim()));

if (isNaN(lat) || isNaN(lng)) {
    console.error('Invalid input.');
    return;
}

map.setView([lat, lng], zoom);
console.log(`Teleported to: Latitude ${lat}, Longitude ${lng}, Zoom ${zoom}`);
}

function createLayerClone(layer) {
var clone;
var subdoms = ['mt0', 'mt1', 'mt2', 'mt3'];
var randomIndex = Math.floor(Math.random() * subdoms.length);
var randomizedSubdoms = subdoms[randomIndex];
// Check if the layer is a Google tile layer
if (layer._url.includes('{s}')) {
    // If it is, replace the current subdomain with 'a' to get a consistent starting point
    var clonedUrl = layer._url.replace(/\{s\}/, randomizedSubdoms);
    clone = L.tileLayer(clonedUrl, {
        maxZoom: layer.options.maxZoom,
        attribution: layer.options.attribution,
        // subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
} else {
    // For non-Google tile layers, simply clone the layer
    clone = L.tileLayer(layer._url, {
        maxZoom: layer.options.maxZoom,
        attribution: layer.options.attribution
    });
}

return clone;
}
