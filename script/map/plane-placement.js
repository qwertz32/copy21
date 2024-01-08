$(document).ready(() => {
    const planeToggleBtn = $('.bfb-plane');
    let planesVisible = true;
    let fetchInterval;
    let cachedData;

    const planeIcon = L.icon({
        iconUrl: '/src/img/B789-high-compress.png',
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        popupAnchor: [0, -5],
        className: 'plane-icon-transition'
    });

    const markersLayer = L.layerGroup().addTo(map);
    let visiblePlanes = {};

    function addOrUpdateMarker(pilot) {
        if (pilot.name && pilot.callsign) {
            const markerId = pilot.callsign;
    
            if (visiblePlanes[markerId]) {
                visiblePlanes[markerId].setLatLng([pilot.latitude, pilot.longitude]);
                visiblePlanes[markerId].setRotationAngle(pilot.heading);
            } else {
                const marker = L.marker([pilot.latitude, pilot.longitude], {
                    icon: planeIcon,
                    rotationAngle: pilot.heading,
                });
                let popupContent = pilot.callsign;
                if (pilot.flight_plan) {
                    popupContent += pilot.flight_plan.aircraft_short ? `<br>${pilot.flight_plan.aircraft_short}` : '';
                    popupContent += pilot.altitude ? `<br>${Math.round(pilot.altitude / 50) * 50}ft ${pilot.flight_plan.cruise_tas}kts tas` : '';
                    popupContent += pilot.flight_plan.departure && pilot.flight_plan.arrival ? `<br>${pilot.flight_plan.departure} - ${pilot.flight_plan.arrival}` : '';
                } else {
                    popupContent += pilot.altitude ? `<br>Altitude: ${Math.round(pilot.altitude / 50) * 50}ft` : '';
                    popupContent += pilot.aircraft_short ? `<br>Aircraft: ${pilot.aircraft_short}` : '';
                }
                marker.bindPopup(popupContent, { className: 'plane-custom-popup' });
                marker.on('mouseover', function () {
                    this.openPopup();
                    $(".leaflet-popup-close-button").css('display', 'none');
                });
                marker.on('mouseout', function () {
                    this.closePopup();
                });
                markersLayer.addLayer(marker);
                visiblePlanes[markerId] = marker;
            }
        }
    }
    

    function isMarkerVisible(pilot, bounds) {
        const markerLatLng = L.latLng(pilot.latitude, pilot.longitude);
        return bounds.contains(markerLatLng);
    }

    function logErrorAndClearInterval(error) {
        console.error('Error:', error);
        clearInterval(fetchInterval);
    }

    function getPlanesPosition() {
        const bounds = map.getBounds();
        const zoom = map.getZoom();
        markersLayer.clearLayers();
        visiblePlanes = {};

        if (cachedData) {
            const visiblePilots = cachedData.pilots.filter(pilot => isMarkerVisible(pilot, bounds));
            const maxVisibleIcons = Math.min(visiblePilots.length, zoom < 5 ? Math.ceil(visiblePilots.length * 0.7) : visiblePilots.length);

            visiblePilots.slice(0, maxVisibleIcons).forEach(pilot => {
                addOrUpdateMarker(pilot);
            });
        } else {
            fetch('https://data.vatsim.net/v3/vatsim-data.json')
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched Data:', data);

                    if (data && data.pilots && Array.isArray(data.pilots)) {
                        cachedData = data;
                        const visiblePilots = data.pilots.filter(pilot => isMarkerVisible(pilot, bounds));
                        const maxVisibleIcons = Math.min(visiblePilots.length, zoom < 5 ? Math.ceil(visiblePilots.length * 0.5) : visiblePilots.length);

                        visiblePilots.slice(0, maxVisibleIcons).forEach(pilot => {
                            addOrUpdateMarker(pilot);
                        });
                    } else {
                        logErrorAndClearInterval('Invalid data structure received');
                    }
                })
                .catch(error => logErrorAndClearInterval(error));
        }
    }

    planeToggleBtn.click(function () {
        if (planesVisible) {
            markersLayer.clearLayers();
            clearInterval(fetchInterval);
        } else {
            getPlanesPosition();
            fetchInterval = setInterval(getPlanesPosition, 60000);
        }
        planesVisible = !planesVisible;
    });

    function handleVisibilityChange() {
        if (document.visibilityState === 'visible' && planesVisible) {
            getPlanesPosition();
            fetchInterval = setInterval(getPlanesPosition, 60000);
        } else {
            clearInterval(fetchInterval);
        }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    setInterval(getPlanesPosition, 60000);

    map.on('moveend zoomend', function () {
        if (planesVisible) {
            getPlanesPosition();
        }
    });
    getPlanesPosition();
});
