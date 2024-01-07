$(document).ready(() => {
    const planeToggleBtn = $('.bfb-plane');
    let planesVisible = true;
    let fetchInterval;

    planeToggleBtn.click(function () {
        if (planesVisible) {
            markersLayer.clearLayers();
            clearInterval(fetchInterval);
        } else {
            getPlanesPosition();
            fetchInterval = setInterval(getPlanesPosition, 60000);
        }

        // Toggle the state
        planesVisible = !planesVisible;
    });

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
        if (pilot.name && pilot.callsign && pilot.flight_plan) {
            const markerId = pilot.callsign;

            if (visiblePlanes[markerId]) {
                visiblePlanes[markerId].setLatLng([pilot.latitude, pilot.longitude]);
                visiblePlanes[markerId].setRotationAngle(pilot.heading);
            } else {
                const marker = L.marker([pilot.latitude, pilot.longitude], {
                    icon: planeIcon,
                    rotationAngle: pilot.heading,
                });

                marker.bindPopup(
                    `${pilot.callsign} ${pilot.flight_plan.aircraft_short} <br> ${Math.round(pilot.altitude / 50) * 50}ft ${pilot.flight_plan.cruise_tas}kts tas <br> ${pilot.flight_plan.departure} - ${pilot.flight_plan.arrival}`,
                    { className: 'plane-custom-popup' }
                );                

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

    function getPlanesPosition() {
        const bounds = map.getBounds();
        const zoom = map.getZoom();

        fetch('https://data.vatsim.net/v3/vatsim-data.json')
            .then(response => response.json())
            .then(data => {
                markersLayer.clearLayers();
                visiblePlanes = {};

                if (data && data.pilots && Array.isArray(data.pilots)) {
                    const visiblePilots = data.pilots.filter(pilot => isMarkerVisible(pilot, bounds));

                    const maxVisibleIcons = zoom < 5 ? Math.ceil(visiblePilots.length * 0.5) : visiblePilots.length;

                    visiblePilots.slice(0, maxVisibleIcons).forEach(pilot => {
                        addOrUpdateMarker(pilot);
                    });
                }
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

    function isMarkerVisible(pilot, bounds) {
        const markerLatLng = L.latLng(pilot.latitude, pilot.longitude);
        return bounds.contains(markerLatLng);
    }

    getPlanesPosition();
    setInterval(getPlanesPosition, 60000);

    map.on('moveend', function () {
        if (planesVisible) {
            getPlanesPosition();
        }
    });
    map.on('zoomend', function () {
        if (planesVisible) {
            getPlanesPosition();
        }
    });
});
