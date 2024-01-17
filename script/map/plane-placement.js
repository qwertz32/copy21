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
                if (!pilot.flight_plan) {
                    // if flight plan not available
                    popupContent += pilot.altitude
                        ? `<br>${Math.round(pilot.altitude / 50) * 50}ft`
                        : '';
                    popupContent += '<br>No flight plan'
                } else {
                    popupContent += pilot.flight_plan.aircraft_short
                        ? `<br>${pilot.flight_plan.aircraft_short}`
                        : '';
                    popupContent += pilot.altitude
                        ? `<br>${Math.round(pilot.altitude / 50) * 50}ft ${pilot.groundspeed}kts tas`
                        : '';
                    popupContent += pilot.flight_plan.departure && pilot.flight_plan.arrival
                        ? `<br>${pilot.flight_plan.departure} - ${pilot.flight_plan.arrival}`
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
                marker.on('click', function () {
                    showPreciseFlightInfo(pilot);
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

        if (L.Browser.mobile) {

        }

        if (planesVisible) {
            if (cachedData) {
                let maxVisibleIcons;

                if (zoom <= 5) {
                    const totalPilots = cachedData.pilots.length;
                    const percentage = 0.40;
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
                            const percentage = 0.40;
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
        const planesLS = localStorage.getItem('planes');
        planesVisible = planesLS !== 'hidden';
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

export async function showPreciseFlightInfo(pilot) {
    $('.f-callsign').text(pilot.callsign);

    if (pilot.flight_plan === null) {
        $('.dep-time, .arv-time, .line-separator-1, .plane-icon-centered-circle, .line-separator-7, .main-icaos-div').css('display', 'none');
        $('.rectangle-parent, .no-flight-plan-warning').fadeIn(300);
    } else {
        $('.no-flight-plan-warning').css('display', 'none');
        $('.dep-time, .arv-time, .line-separator-1, .plane-icon-centered-circle, .line-separator-7, .main-icaos-div').css('display', 'flex');
        $('.dep-time').text(`${pilot.flight_plan.deptime.substring(0, 2)}:${pilot.flight_plan.deptime.substring(2)}`);
        let [deptimeH, deptimeM, enrouteH, enrouteM] = [parseInt(pilot.flight_plan.deptime.substring(0, 2)), parseInt(pilot.flight_plan.deptime.substring(2)), Math.floor(parseInt(pilot.flight_plan.enroute_time) / 100), parseInt(pilot.flight_plan.enroute_time) % 100];
        let [arrivalH, arrivalM] = [(deptimeH + enrouteH + Math.floor((deptimeM + enrouteM) / 60)) % 24, (deptimeM + enrouteM) % 60];
        $('.arv-time').text(`${arrivalH.toString().padStart(2, '0')}:${arrivalM.toString().padStart(2, '0')}`);
    }

    $('#departureIcao').text(pilot.flight_plan?.departure || 'N/A');
    $('#arrivalIcao').text(pilot.flight_plan?.arrival || 'N/A');
    $('.flight-data-speed').text(pilot.groundspeed + ' KT' || 'N/A');
    $('.flight-data-altitude').text(pilot.altitude + ' FT' || 'N/A');
    $('.flight-data-squawk').text(pilot.transponder || 'N/A');
    $('.flight-data-altimeter-normal').text(pilot.qnh_mb + 'hPa');
    $('.flight-data-altimeter-us').text(pilot.qnh_i_hg.toFixed(2) + 'inHg');
    $('.aircraft-details-aircraft-name').text(pilot.flight_plan?.aircraft_short || 'N/A');

    try {
        const airlineData = await getAirlineDataFromCallsign(pilot.callsign);

        if (airlineData) {
            const logoUrl = `https://vatsim1.netlify.app/src/img/airline_logos/${airlineData.Code}_logo.png`;
            $('.airline-logo').attr('src', logoUrl);
            $('.f-airline').text(airlineData.Name);
            console.log('the image and name should be in the content');
        } else {
            console.error("Error: Unable to find airline data for the callsign.");
        }
    } catch (error) {
        console.error("Error fetching airline data:", error);
    }

    if (pilot.flight_plan) {
        if (pilot.flight_plan.flight_rules === "I") {
            $('.flight-data-rules').text('IFR' || 'N/A');
        } else if (pilot.flight_plan.flight_rules === "V") {
            $('.flight-data-rules').text('VFR' || 'N/A');
        } else {
            $('.flight-data-rules').text(pilot.flight_plan.flight_rules);
        }
    } else {
        $('.flight-data-rules').text('N/A');
    }

    $('.flight-data-heading').text(pilot.heading + "\u00B0");
    $('.text-details-route').text(pilot.flight_plan?.route || 'N/A');
    $('.text-details-remarks').text(pilot.flight_plan?.remarks || 'N/A');
    $('.aircraft-details-aircraft-name').text(pilot.flight_plan?.aircraft_short || 'N/A');

    $('.rectangle-parent').fadeIn(300);
}

async function getAirlineDataFromCallsign(callsign) {
    const firstThreeSymbols = callsign.substring(0, 3);
    try {
        const response = await fetch('/src/json/airlines.json');
        const data = await response.json();
        const matchingAirline = data.rows.find(airline => airline.ICAO === firstThreeSymbols);
        if (matchingAirline) {
            return matchingAirline;
        } else {
            console.error("Error: Airline not found in the JSON data.");
            $('.airline-logo').attr('src', 'https://vatsim1.netlify.app/src/img/airline_logos/lo_logo.png');
        }
    } catch (error) {
        console.error("Error fetching airline data:", error);
        $('.airline-logo').attr('src', 'https://vatsim1.netlify.app/src/img/airline_logos/lo_logo.png');
    }
}
