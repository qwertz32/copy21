$(document).ready(() => {
    const airportToggleBtn = $('.bfb-airports');
    const airportIcon = L.icon({
        iconUrl: '/src/img/placeholder_684908.png',
        iconSize: [18, 18],
        iconAnchor: [12, 12],
        popupAnchor: [-3, -15],
        className: 'airport-icon-transition',
    });
    const markersLayer = L.layerGroup().addTo(map);
    let airportData, airportsVisible = true, lsAirports = localStorage.getItem('airports');

    function addMarker(airport) {
        if (airport.icao && airport.lat && airport.lon) {
            const marker = L.marker([airport.lat, airport.lon], { icon: airportIcon });
            marker.bindPopup(airport.name + ' ' + airport.icao || 'Unnamed Airport', {
                className: 'airport-custom-popup',
                closeButton: false,
            }).openPopup();
            markersLayer.addLayer(marker);
        }
    }

    async function fetchAirportsData() {
        return fetch('/src/json/airports.json')
            .then(response => response.json())
            .then(data => airportData = data.rows)
            .catch(error => console.error(error));
    }

    function getAirports() {
        const bounds = map.getBounds();

        if (lsAirports === 'visible') {
            if (!airportData) {
                fetchAirportsData().then(() => displayAirports(bounds));
            } else {
                displayAirports(bounds);
            }
        } else if (airportsVisible) {
            if (!airportData) {
                fetchAirportsData().then(() => displayAirports(bounds));
            } else {
                displayAirports(bounds);
            }
        } else {
            markersLayer.clearLayers();
        }
    }

    function displayAirports(bounds) {
        markersLayer.clearLayers();
        let addedAirports = 0;

        airportData.forEach(airport => {
            if (isMarkerVisible(airport, bounds) && addedAirports < 350) {
                addMarker(airport);
                addedAirports++;
            }
        });
    }

    function isMarkerVisible(airport, bounds) {
        const markerLatLng = L.latLng(airport.lat, airport.lon);
        return bounds.contains(markerLatLng);
    }

    function checkIfAirportsShown() {
        airportsVisible = lsAirports !== 'hidden';
        updateAirportVisibility();
    }

    function updateAirportVisibility() {
        airportsVisible ? getAirports() : markersLayer.clearLayers();
    }

    checkIfAirportsShown();

    airportToggleBtn.click(function () {
        airportsVisible = !airportsVisible;
        localStorage.setItem('airports', airportsVisible ? 'visible' : 'hidden');
        updateAirportVisibility();
    });

    map.on('moveend zoomend', function () {
        airportsVisible && getAirports();
    });

    getAirports();
});
