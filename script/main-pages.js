var loadingSpinnerShown = false;

function showLoadingSpinner() {
    if (!loadingSpinnerShown) {
        $('#loading-container').css('display', 'flex');
        $('#loading-spinner').fadeIn().css('display', 'flex');
        loadingSpinnerShown = true;
    }
}

function hideLoadingSpinner() {
    $('#loading-spinner').fadeOut(function() {
        $(this).css('display', 'none');
        $('#loading-container').fadeOut().css('display', 'none');
    });
};

setTimeout(function () {
    showLoadingSpinner();
}, 500);

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


//Start of the actual code


var map, currentLayer, initialCoordinates, initialZoom;
var presetCoordinatesList = [
    [27.386445836446814, 15.59099952979347], 
    [25.19693081190781, 55.27419425547124],
    [55.751605578948634,37.622505547875434], // 
    [39.043127453366125,125.7556205996649], //
    [35.70132841614543,499.7335694356339], //
    [40.6892040108378,-74.04478900061456], //
    [23.764313175283185,90.2804708680347], //
    [0.0,0.0], 
    [-70.30468490953506,24.048737550483317], //
    [-43.52892045765742,171.35833055943286], //
    [33.95624057296359,-118.24731336563917], //
    [71.53863351460842,-53.21127807509122], //
    [52.23919989939035,21.04489368750266], //
    
];
// var storedCoordinates, storedZoom;
var menuOptions = $('.menu-options');
var tileLayerUrl = 'https://mt2.google.com/vt?lyrs=s&x={x}&y={y}&z={z}';
var presetCoordinates = isMobile() ? [54.526000, 15.255100] : getRandomCordsForStart();
var presetZoom = isMobile() ? 4 : 3; 
var ipToken = '57181dfc23ba47';
// var gotMapZoom = localStorage.getItem('mapZoom');
// var gotMapCords = localStorage.getItem('mapCoordinates');
// var gotMapProvider = 

var google = L.tileLayer('https://cartodb-basemaps-c.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
    minZoom: 2.5,
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

try {
    // storedCoordinates = gotMapCords;
    // storedZoom = gotMapZoom;
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
};

function getRandomCordsForStart() {
    var randomIndex2 = Math.floor(Math.random() * presetCoordinatesList.length);
    return presetCoordinatesList[randomIndex2];
}

function isMobile() {
    return $(window).width() <= 768;
};

initialZoom = parseFloat(storedZoom) || presetZoom;

map = L.map('map', {
    zoomControl: false,
    zoomSnap: 0.20,
    zoomDelta: 0.75
}).setView(initialCoordinates, initialZoom);

google.addTo(map);

map.on('moveend', function() {
    var currentCoordinates = map.getCenter();
    var currentZoom = map.getZoom();
    localStorage.setItem('mapCoordinates', JSON.stringify(currentCoordinates));
    localStorage.setItem('mapZoom', currentZoom.toString());
});

var currentLayer = google;

function showTime(clockClass) {
    const date = new Date();
    let h = date.getUTCHours(); // 0 - 23
    let m = date.getUTCMinutes(); // 0 - 59
    const day = date.getUTCDate();
    const monthShort = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    const minutesAndDate = day + ' ' + monthShort;

    const finalDate = `${h}${m}Z ${minutesAndDate}`;

    $(clockClass).text(finalDate);
}

$(document).ready(function () {
    showTime(".clock");

    setInterval(function () {
        showTime(".clock");
    }, 1000);
});


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

function getCountry() {
    $.ajax({
        url: 'https://ipinfo.io/json?token=' + ipToken,
        dataType: 'json',
        success: function(data2) {
            var userCountry = data2.country || '';
            console.log("Country code:", userCountry);
            if (userCountry !== null) {
                var attributionContainer = $('.leaflet-control-attribution');
                var currentAttribution = attributionContainer.html();
                var newAttribution = currentAttribution + ' | ' + userCountry;
                attributionContainer.html(newAttribution);
                console.log("Successfuly implemented user's country code.")
            } else {
                console.error(error);
                hideLoadingSpinner();
            }
            hideLoadingSpinner();
        },
        error: function(error) {
            console.error('Error fetching country.\n', error);
            hideLoadingSpinner();
        }
    });
}

getCountry();

// Your menu icon and nav logo logic
$(".menu-icon").click(function () {
    $(".menu-options").slideToggle();
});

$(document).click(function (event) {
    if (!$(event.target).closest('.menu-icon, .menu-options').length) {
        $(".menu-options").slideUp();
    }
});

// $(".nav-logo").click(function() {
//     $(".nav-logo-popup").fadeToggle();
// });

// $(document).click(function (event) {
//     if (!$(event.target).closest('.nav-logo, .nav-logo-popup').length) {
//         $(".nav-logo-popup").fadeOut();
//     }
// });