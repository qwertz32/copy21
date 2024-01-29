function isMobile() {
    return $(window).width() <= 768;
}

var presetCoordinatesList = [
    [27.386445836446814, 15.59099952979347],
    [25.19693081190781, 55.27419425547124],
    [55.751605578948634, 37.622505547875434],
    [39.043127453366125, 125.7556205996649],
    [35.70132841614543, 499.7335694356339],
    [40.6892040108378, -74.04478900061456],
    [23.764313175283185, 90.2804708680347],
    [0.0, 0.0],
    [-70.30468490953506, 24.048737550483317],
    [-43.52892045765742, 171.35833055943286],
    [33.95624057296359, -118.24731336563917],
    [71.53863351460842, -53.21127807509122],
    [52.23919989939035, 21.04489368750266],
];

var tileLayerUrl = 'https://mt2.google.com/vt?lyrs=s&x={x}&y={y}&z={z}';
var presetCoordinates = isMobile() ? [54.526000, 15.255100] : getRandomCordsForStart();
var presetZoom = isMobile() ? 4 : 3;

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

function getRandomCordsForStart() {
    var randomIndex2 = Math.floor(Math.random() * presetCoordinatesList.length);
    return presetCoordinatesList[randomIndex2];
}

var map, baseLayer, weatherLayer, labelLayer, initialCoordinates, initialZoom;

$(document).ready(function () {
    initialZoom = parseFloat(storedZoom) || presetZoom;
    initialCoordinates = JSON.parse(storedCoordinates) || presetCoordinates;

    function initializeMap() {
        map = L.map('map', {
            attributionControl: false,
            zoomControl: false,
            zoomSnap: 0.20,
            zoomDelta: 0.75,
        });
    }
    initializeMap();

    // baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VkeCIsImEiOiJjbHJrMnd2cXEwOTJnMmpwd2p6aHBrM3VhIn0.osPTV54Z_O4ezRmaO696Lg', {
    baseLayer = L.tileLayer('https://cartodb-basemaps-c.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 19,
        attribution: '<a href="https://carto.com/basemaps" target="_blank">Carto</a>',
        preload: Infinity,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        keepBuffer: 5,
        zIndex: 1
    });

    var weatherLayer = createTileLayer('', {
        minZoom: 3,
        maxZoom: 19,
        opacity: 0.45,
        attribution: '<a href="https://www.rainviewer.com/" target="_blank">Rainviewer</a>',
        preload: Infinity,
        keepBuffer: 5,
        zIndex: 3
    });
    
    var labelLayer = createTileLayer('https://cartodb-basemaps-c.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 19,
        preload: Infinity,
        keepBuffer: 5,
        zIndex: 2
    });

    function currentVersionToAttribution() {
        let attributionVersionText; 
        $.ajax({
            url: '/version.json',
            dataType: 'json',
            success: function (data) {
                attributionVersionText = 'V' + data.version.ver + ', Build: ' + data.version.build + ' |';
                console.log("built the attributionVerText correctly");
                const attributionText = `${attributionVersionText} <a href="https://leafletjs.com/" target="_blank">Leaflet</a>`;
                const atrCtrl = L.control.attribution({ position: 'topright' }).addTo(map);
                atrCtrl.setPrefix(attributionText);
            },
            error: function () {
                console.log("errored");
                $('#loading-build-info').text('');
            }
        });
    }
    
    currentVersionToAttribution();

    baseLayer.addTo(map);

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

    map.setView(initialCoordinates, initialZoom);

    function createTileLayer(url, options) {
        return L.tileLayer(url, options);
    }

    function addLayerToMap(layer) {
        map.addLayer(baseLayer);
        if (!map.hasLayer(layer)) {
            map.addLayer(layer);
        }
        map.setView(map.getCenter(), map.getZoom());
    }
    
    function removeLayerFromMap(layer) {
        map.addLayer(baseLayer);
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
        map.setView(map.getCenter(), map.getZoom());
    }

    function checkMapLayers() {
        if (localStorage.getItem('weather-layer') === 'shown') {
            addLayerToMap(weatherLayer);
            updateWeatherLayer();
            console.log('Weather layer is shown');
        }
        if (localStorage.getItem('labels') === 'shown') {
            addLayerToMap(labelLayer);
            console.log('Labels are shown');
        }
    }
    checkMapLayers();

    $('.bfb-weather').on('click', function () {
        if (map.hasLayer(weatherLayer)) {
            removeLayerFromMap(weatherLayer);
            localStorage.removeItem('weather-layer');
            console.log('Weather layer removed');
        } else {
            addLayerToMap(weatherLayer);
            localStorage.setItem('weather-layer', 'shown');
            updateWeatherLayer();
            console.log('Weather layer added');
        }
    });

    $('.bfb-labels').on('click', function() {
        if (map.hasLayer(labelLayer)) {
            removeLayerFromMap(labelLayer);
            localStorage.removeItem('labels');
            console.log('Labels removed');
        } else {
            addLayerToMap(labelLayer);
            localStorage.setItem('labels', 'shown');
            console.log('Labels added');
        }
    });

    function updateWeatherLayer() {
        fetch('https://tilecache.rainviewer.com/api/maps.json')
            .then(response => response.json())
            .then(data => {
                const highestTimestamp = Math.max(...data);
                const newWeatherLayerUrl = `https://tilecache.rainviewer.com/v2/radar/${highestTimestamp}/512/{z}/{x}/{y}/6/0_1.png`;
                weatherLayer.setUrl(newWeatherLayerUrl);
                console.log('WeatherLayer URL updated:', newWeatherLayerUrl);
                if (localStorage.getItem('weather-layer') === 'shown') {
                    addLayerToMap(weatherLayer);
                }
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }
    updateWeatherLayer();

});
