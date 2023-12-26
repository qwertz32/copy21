var mapProviders;
var mapHistory = []; // Stack to store past map changes
var maxHistoryLength = 10; // Maximum length of the history stack

sourcesJson = 'sources.json';

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

window.onload = function() {
    // Move the button visibility code here
    var button = document.querySelector('.btn');
    button.style.display = 'block';
    button.style.visibility = 'visible';
};

function callMapSources(mapSources) {
    mapProviders = mapSources; // Assign the fetched data to mapProviders
}

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
                attribution: 'Custom Attribution'
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


//Start of the actual code


var map, currentLayer, initialCoordinates, initialZoom;
var tileLayerUrl = 'https://mt2.google.com/vt?lyrs=s&x={x}&y={y}&z={z}';
var presetCoordinates = [27.386445836446814, 15.59099952979347];
var presetZoom = 3;

var google = L.tileLayer('https://{s}.google.com/vt?lyrs=s&z={z}&y={y}&x={x}', {
    maxZoom: 21,
    // maxNativeZoom: 18,
    attribution: '© Google Maps',
    preload: Infinity,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    keepBuffer: 5
});

var apple = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 22,
    attribution: 'Unspecified Maps',
    preload: Infinity,
    keepBuffer: 5
});

var baseMaps = {
    "Google Maps": google,
    "Apple Maps": apple
};

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

map = L.map('map', {
    zoomSnap: 0.45,
    zoomDelta: 0.75
}).setView(initialCoordinates, initialZoom);

map.removeControl(map.zoomControl); //Remove the deafult zoom controls from the top left (they were doubled)

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

google.addTo(map);

map.on('moveend', function() {
    var currentCoordinates = map.getCenter();
    var currentZoom = map.getZoom();
    localStorage.setItem('mapCoordinates', JSON.stringify(currentCoordinates));
    localStorage.setItem('mapZoom', currentZoom.toString());
});

var currentLayer = google;

// // Function to change the map layer
// function swapBgBtn() {
//     var btnBg = $('.btn-in'); // Change the selector to target the button with class btn-in
//     var bgUrl;

//     // Check if the currentLayer exists in the mapProviders JSON
//     if (mapProviders && mapProviders[currentLayer]) {
//         // Assume 'Satellite' is the mapType, you can replace it with your actual logic
//         // bgUrl = mapProviders[currentLayer][];
//     }

//     // Set the background URL
//     btnBg.css('background-image', `url('${bgUrl}')`);

//     console.log("bgUrl = " + bgUrl);
// }



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
// // Wait for the DOM content to be loaded
// document.addEventListener('DOMContentLoaded', function () {
// Add mouseover and mouseout event listeners to the button
//     var btn = $('.btn');
//     var options = $('.options');
//     var hideTimeout;

//     btn.mouseover(function () {
//         // Show the options when the button is hovered
//         // clearTimeout(hideTimeout);
//         options.css({ display: 'flex' });
//     });

//     btn.mouseout(function () {
//         // Set a timeout to hide the options after a delay
//         hideTimeout = setTimeout(function () {
//             options.css({ display: 'none' });
//         }, 300);
//     });

//     options.mouseover(function () {
//         // Clear the hide timeout when options are hovered
//         // clearTimeout(hideTimeout);
//     });

//     options.mouseout(function () {
//         // Set a timeout to hide the options after a delay
//         hideTimeout = setTimeout(function () {
//             options.css({ display: 'none' });
//         }, 300);
//     });
// // });

var btn = $('.btn');
var options = $('.options');
var hideTimeout;

btn.mouseover(function() {
    // Show the options when the button is hovered
    clearTimeout(hideTimeout);
    options.css({
        display: 'inline'
    });
});

btn.mouseout(function() {
    // Set a timeout to hide the options after a delay
    hideTimeout = setTimeout(function() {
        options.css({
            display: 'none'
        });
    }, 300);
});

options.mouseover(function() {
    // Clear the hide timeout when options are hovered
    clearTimeout(hideTimeout);
    // Add a class to indicate the options are being hovered
    options.addClass('hovered');
});

options.mouseout(function() {
    // Set a timeout to hide the options after a delay
    hideTimeout = setTimeout(function() {
        options.css({
            display: 'none'
        });
        // Remove the class when the options are no longer hovered
        options.removeClass('hovered');
    }, 300);
});