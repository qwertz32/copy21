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
            zoomDelta: 0.75
        });
    }
    initializeMap();

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
    var atrCtrl = L.control.attribution({ position: 'topright' }).addTo(map);
    atrCtrl.setPrefix('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg><a href="https://github.com/skerretoo/timeshow target="_blank">This project on Github</a>| <a href="https://leafletjs.com/" target="_blank">Leaflet</a>'); //fix to remove the ukrainian flag

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
