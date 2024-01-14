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
        className: 'plane-icon-transition',
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
                    popupContent += pilot.flight_plan.aircraft_short
                        ? `<br>${pilot.flight_plan.aircraft_short}`
                        : '';
                    popupContent += pilot.altitude
                        ? `<br>${Math.round(pilot.altitude / 50) * 50}ft ${pilot.groundspeed}kts tas`
                        : '';
                    popupContent +=
                        pilot.flight_plan.departure && pilot.flight_plan.arrival
                            ? `<br>${pilot.flight_plan.departure} - ${pilot.flight_plan.arrival}`
                            : '';
                } else {
                    // if flight plan not available
                    popupContent += pilot.altitude
                        ? `<br>${Math.round(pilot.altitude / 50) * 50}ft`
                        : '';
                    popupContent += pilot.aircraft_short
                        ? `<br>Aircraft: ${pilot.aircraft_short}`
                        : '';
                }
                marker.bindPopup(popupContent, {
                    className: 'plane-custom-popup',
                });
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

    function getPlanesPosition() {
        const bounds = map.getBounds();
        const zoom = map.getZoom();
        markersLayer.clearLayers();
        visiblePlanes = {};
    
        if (planesVisible) { 
            if (cachedData) {
                let maxVisibleIcons;
    
                if (zoom <= 5) {
                    const totalPilots = cachedData.pilots.length;
                    const percentage = 0.15;
                    maxVisibleIcons = Math.ceil(totalPilots * percentage);
                } else {
                    maxVisibleIcons = cachedData.pilots.length;
                }
    
                const visiblePilots = cachedData.pilots.filter((pilot) =>
                    isMarkerVisible(pilot, bounds)
                );
                visiblePilots.slice(0, maxVisibleIcons).forEach((pilot) => {
                    addOrUpdateMarker(pilot);
                });
            } else {
                fetch('https://data.vatsim.net/v3/vatsim-data.json')
                    .then((response) => response.json())
                    .then((data) => {
                        if (data && data.pilots && Array.isArray(data.pilots)) {
                            cachedData = data;
                            const totalPilots = data.pilots.length;
                            const percentage = 0.4;
                            const maxVisibleIcons = Math.ceil(totalPilots * percentage);
                            const visiblePilots = data.pilots.filter((pilot) =>
                                isMarkerVisible(pilot, bounds)
                            );
                            visiblePilots.slice(0, maxVisibleIcons).forEach((pilot) => {
                                addOrUpdateMarker(pilot);
                            });
                        }
                    });
            }
        }
    }
    function checkIfPlanesStored() {
        const planesPreference = localStorage.getItem('planes');
        planesVisible = planesPreference !== 'hidden';
        updatePlaneVisibility(); 
    }
    checkIfPlanesStored();
    function updatePlaneVisibility() {
        if (planesVisible) {
            getPlanesPosition();
            fetchInterval = setInterval(getPlanesPosition, 60000);
        } else {
            markersLayer.clearLayers();
            clearInterval(fetchInterval);
        }
    }
    planeToggleBtn.click(function () {
    planesVisible = !planesVisible;
    if (planesVisible) {
        localStorage.setItem('planes', 'visible');
    } else {
        localStorage.setItem('planes', 'hidden');
    }
    updatePlaneVisibility(); 
});

    map.on('moveend zoomend', function () {
        if (planesVisible) {
            getPlanesPosition();
        }
    });

    getPlanesPosition();
});
