$(document).ready(() => {
    const airportToggleBtn = $('.bfb-airports');
    const airportIcon = L.icon({
        iconUrl: '/src/img/placeholder_684908.png',
        iconSize: [18, 18],
        iconAnchor: [12, 12],
        popupAnchor: [0, -5],
        className: 'airport-icon-transition',
    });

    const markersLayer = L.layerGroup().addTo(map);
    let airportData;
    let airportsVisible = true;
    let lsAirports = localStorage.getItem('airports');

    function addAirportMarker(airport) {
        if (airport.icao && airport.lat && airport.lon) {
            const marker = L.marker([airport.lat, airport.lon], {
                icon: airportIcon,
            });
    
            // Create a popup content string
            const popupContent = airport.name + ' ' + airport.icao || 'Unnamed Airport';
    
            // Bind the popup with the correct class name and set the title
            marker.bindPopup(popupContent, {
                className: 'airport-custom-popup',
                closeButton: false, // Optional: to hide the close button
            }).openPopup(); // Open the popup to set the title
    
            // Set the title directly in JavaScript
            const popup = marker.getPopup();
            if (popup) {
                popup.options.title = 'helo';
            }
    
            markersLayer.addLayer(marker);
        }
    }
    
    
    

    // Function to fetch airports data
    function fetchAirportsData() {
        const airportsJson = '/src/json/airports-2.json';
        return fetch(airportsJson)
            .then((response) => response.json())
            .then((data) => {
                airportData = data.rows;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Function to get airports based on visibility and cached data
    function getAirports() {
        const bounds = map.getBounds();

        if (lsAirports === 'visible') {
            if (!airportData) {
                // Fetch data only if not already cached
                fetchAirportsData().then(() => displayAirports(bounds));
            } else {
                // Use cached data
                displayAirports(bounds);
            }
        } else if (airportsVisible) {
            if (!airportData) {
                fetchAirportsData().then(() => displayAirports(bounds));
            } else {
                displayAirports(bounds);
            }
        } else {
            // Hide airports if not visible
            markersLayer.clearLayers();
        }
    }

    // Function to display airports on the map
    function displayAirports(bounds) {
        markersLayer.clearLayers();
        let addedAirports = 0;

        airportData.forEach((airport) => {
            if (isMarkerVisible(airport, bounds) && addedAirports < 350) {
                addAirportMarker(airport);
                addedAirports++;
            }
        });
    }
    function isMarkerVisible(airport, bounds) {
        const markerLatLng = L.latLng(airport.lat, airport.lon);
        return bounds.contains(markerLatLng);
    }
    // Function to check if airports are supposed to be shown
    function checkIfAirportsShown() {
        airportsVisible = lsAirports !== 'hidden';
        updateAirportVisibility();
    }

    // Function to update airports visibility
    function updateAirportVisibility() {
        if (airportsVisible) {
            getAirports();
        } else {
            markersLayer.clearLayers();
        }
    }

    // Initial check for airports visibility
    checkIfAirportsShown();

    // Function to handle airport toggle button click
    airportToggleBtn.click(function () {
        airportsVisible = !airportsVisible;
        if (airportsVisible) {
            localStorage.setItem('airports', 'visible');
        } else {
            localStorage.setItem('airports', 'hidden');
        }
        updateAirportVisibility();
    });

    // Event listener for map movement/zoom changes
    map.on('moveend zoomend', function () {
        if (airportsVisible) {
            getAirports();
        }
    });

    // Initial fetch and display of airports data
    getAirports();
});
