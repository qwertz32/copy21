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
function changeMap(provider, mapType) {
if (mapProviders && mapProviders[provider]) {
    var mapUrl = mapProviders[provider][mapType];

    if (mapUrl) {
        mapHistory.push(createLayerClone(currentLayer));
        if (mapHistory.length > maxHistoryLength) {
            mapHistory.shift();
        }
        map.removeLayer(currentLayer);
        var newLayer = L.tileLayer(mapUrl, {
            maxZoom: 18,
            attribution: 'Custom Map Provider'
        });
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
function mapReturn() {
if (mapHistory.length > 0) {
    map.removeLayer(currentLayer);
    var previousLayer = mapHistory.pop();
    previousLayer.addTo(map);
    currentLayer = previousLayer;
    console.log(`Returned to the previous map provider`);
} else {
    console.error(`No previous map provider stored`);
}
}