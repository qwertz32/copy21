let cachedVatsimData, updateTimestamp;
$(document).ready(() => {
    const planeToggleBtn = $(".bfb-plane");
    let planesVisible = true;

    const planeIcon = L.icon({
        iconUrl: "/src/img/B789-high-compress.png",
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        popupAnchor: [0, -5],
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
                const marker = L.marker([parseFloat(pilot.latitude), parseFloat(pilot.longitude)], {
                    icon: planeIcon,
                    rotationAngle: pilot.heading,
                });
                let popupContent = pilot.callsign;
                if (!pilot.flight_plan) {
                    // if flight plan not available
                    popupContent += pilot.altitude ? `<br>${Math.round(pilot.altitude / 50) * 50}ft` : "";
                    popupContent += "<br>No flight plan";
                } else {
                    popupContent += pilot.flight_plan.aircraft_short ? `<br>${pilot.flight_plan.aircraft_short}` : "";
                    popupContent += pilot.altitude ? `<br>${Math.round(pilot.altitude / 50) * 50}ft ${pilot.groundspeed}kts tas` : "";
                    popupContent +=
                        pilot.flight_plan.departure && pilot.flight_plan.arrival ? `<br>${pilot.flight_plan.departure} - ${pilot.flight_plan.arrival}` : "";
                }
                marker.bindPopup(popupContent, {
                    className: "plane-custom-popup",
                });
                marker.on("mouseover", function () {
                    this.openPopup();
                    $(".leaflet-popup-close-button").css("display", "none");
                });
                marker.on("mouseout", function () {
                    this.closePopup();
                });
                marker.on("click", function () {
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

    // getPlanesPosition()

    function handleVisibilityChange() {
        if (document.visibilityState === "visible" && planesVisible) {
            getPlanesPosition();
        } else {
            console.error("an error occurred when getting planes' position.");
        }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    setInterval(getPlanesPosition, 60000);

    function getPlanesPosition() {
        const bounds = map.getBounds();
        const zoom = map.getZoom();
        markersLayer.clearLayers();
        visiblePlanes = {};

        if (planesVisible) {
            if (cachedVatsimData) {
                let maxVisibleIcons;
                // console.log('cachedVatsimData' + cachedVatsimData)
                if (zoom <= 5) {
                    const totalPilots = cachedVatsimData.pilots.length;
                    const percentage = 0.4;
                    maxVisibleIcons = Math.ceil(totalPilots * percentage);
                } else {
                    maxVisibleIcons = cachedVatsimData.pilots.length;
                }

                const visiblePilots = cachedVatsimData.pilots.filter((pilot) => isMarkerVisible(pilot, bounds));
                visiblePilots.slice(0, maxVisibleIcons).forEach((pilot) => {
                    addOrUpdateMarker(pilot);
                });

                updateTimestamp = cachedVatsimData.general.update;
            } else {
                fetch("https://data.vatsim.net/v3/vatsim-data.json")
                    .then((response) => response.json())
                    .then((data) => {
                        if (data && data.pilots && Array.isArray(data.pilots)) {
                            cachedVatsimData = data;
                            const totalPilots = data.pilots.length;
                            const percentage = 0.4;
                            const maxVisibleIcons = Math.ceil(totalPilots * percentage);
                            const visiblePilots = data.pilots.filter((pilot) => isMarkerVisible(pilot, bounds));
                            visiblePilots.slice(0, maxVisibleIcons).forEach((pilot) => {
                                addOrUpdateMarker(pilot);
                            });
                            updateTimestamp = cachedVatsimData.general.update;
                        }
                    });
            }
        }
    }

    function checkIfPlanesStored() {
        const planesLS = localStorage.getItem("planes");
        planesVisible = planesLS !== "hidden";
        updatePlaneVisibility();
    }

    checkIfPlanesStored();

    function updatePlaneVisibility() {
        if (planesVisible) {
            getPlanesPosition();
        } else {
            markersLayer.clearLayers();
        }
    }

    planeToggleBtn.click(function () {
        planesVisible = !planesVisible;
        if (planesVisible) {
            localStorage.setItem("planes", "visible");
        } else {
            localStorage.setItem("planes", "hidden");
        }
        updatePlaneVisibility();
    });

    map.on("moveend zoomend", function () {
        if (planesVisible) {
            getPlanesPosition();
        }
    });

    getPlanesPosition();

    $(".d-a-departure").on("click", function () {
        console.log("departure clicked");
    });
});

export async function showPreciseFlightInfo(pilot) {
    let vatsimDataUpdateTime, remarksEssence, registrationText;

    // fetch("/src/json/countries.json").then(response);

    fetch("https://data.vatsim.net/v3/vatsim-data.json")
        .then((response) => response.json())
        .then((data) => {
            vatsimDataUpdateTime = data.general.update;
            $(".f-callsign").text(pilot.callsign);
            let result = (vatsimDataUpdateTime + "").slice(8).replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");
            console.log(result);
            $(".update-time").text(`Last Update: ${result}Z`);
        });

    $(".f-callsign").text(pilot.callsign);

    if (pilot.flight_plan === null) {
        $(".dep-time, .arv-time, .line-separator-1, .plane-icon-centered-circle, .line-separator-7, .main-icaos-div, .city-airport-names").css("display", "none");
        $(".rectangle-parent, .no-flight-plan-warning").css("display", "flex");
    } else {
        $(".no-flight-plan-warning").css("display", "none");
        $(".dep-time, .arv-time, .line-separator-1, .plane-icon-centered-circle, .line-separator-7, .main-icaos-div, .city-airport-names").css("display", "flex");
        $(".dep-time").text(`${pilot.flight_plan.deptime.substring(0, 2)}:${pilot.flight_plan.deptime.substring(2)}`);
        let [deptimeH, deptimeM, enrouteH, enrouteM] = [
            parseInt(pilot.flight_plan.deptime.substring(0, 2)),
            parseInt(pilot.flight_plan.deptime.substring(2)),
            Math.floor(parseInt(pilot.flight_plan.enroute_time) / 100),
            parseInt(pilot.flight_plan.enroute_time) % 100,
        ];
        let [arrivalH, arrivalM] = [(deptimeH + enrouteH + Math.floor((deptimeM + enrouteM) / 60)) % 24, (deptimeM + enrouteM) % 60];
        $(".arv-time").text(`${arrivalH.toString().padStart(2, "0")}:${arrivalM.toString().padStart(2, "0")}`);
    }

    $("#departureIcao").text(pilot.flight_plan?.departure || "N/A");
    $("#arrivalIcao").text(pilot.flight_plan?.arrival || "N/A");
    $(".flight-data-speed").text(pilot.groundspeed + " KT" || "N/A");
    $(".flight-data-altitude").text(pilot.altitude + " FT" || "N/A");
    $(".flight-data-squawk").text(pilot.transponder || "N/A");
    $(".flight-data-altimeter-normal").text(pilot.qnh_mb + "hPa");
    $(".flight-data-altimeter-us").text(pilot.qnh_i_hg.toFixed(2) + "inHg");
    $(".aircraft-details-aircraft-name").text(pilot.flight_plan?.aircraft_short || "N/A");

    if (pilot.flight_plan) {
        const searchTerm = "REG/";
        registrationText = pilot.flight_plan.remarks.toLowerCase().includes(searchTerm.toLowerCase())
            ? pilot.flight_plan.remarks.split(searchTerm)[1]?.split(" ")[0]
            : null;
        if (registrationText) {
            $(".aircraft-details-aircraft-registration").text(registrationText);
            console.log(registrationText);
        } else {
            $(".aircraft-details-aircraft-registration").text("N/A");
            console.error("No registration information found in remarksOne");
        }
    } else {
        console.error("No remarks for the selected flight.");
    }

    try {
        const airlineData = await getAirlineDataFromCallsign(pilot.callsign);

        if (airlineData && airlineData.Code) {
            const logoUrl = `/src/img/airline_logos/${airlineData.Code}_logo.png`;
            $(".airline-logo").attr("src", logoUrl).css("display", "block");
            $(".f-airline").text(airlineData.Name);
        } else {
            implementNotFoundAirplaneData();
        }
    } catch (error) {
        console.error(error);
    }

    await getAirportDataFromICAO();

    // flight rules
    if (pilot.flight_plan) {
        if (pilot.flight_plan.flight_rules === "I") {
            $(".flight-data-rules").text("IFR" || "N/A");
        } else if (pilot.flight_plan.flight_rules === "V") {
            $(".flight-data-rules").text("VFR" || "N/A");
        } else {
            $(".flight-data-rules").text(pilot.flight_plan.flight_rules);
        }
    } else {
        $(".flight-data-rules").text("N/A");
    }

    // Function to set country details
    function setCountryDetails(country, size = "19px") {
        console.log(`Found country: ${country.name} (${country.code})`);
        $(".aircraft-details-aircraft-registration-country").text(country.name).css({ left: "372px", "font-size": size });
        $(".aircraft-details-aircraft-registration-country-flag")
            .attr("src", "/src/img/flags/" + country.code + "_flag.png")
            .css("width", "47px");
    }

    // Function to handle no matching country
    function handleNoMatchingCountry() {
        // aircraftsRegistrationCtrFLAGNotFound();
        // aircraftsRegistrationCtrNotFound();
        $(".aircraft-details-aircraft-registration-country").text("N/A").css({ left: "362px", "font-size": "var(--font-size-1)" });
        $(".aircraft-details-aircraft-registration-country-flag").css("width", "0");
    }

    // Saved in case someone in the future would want to have those functionalities split
    // function aircraftsRegistrationCtrNotFound() {
    //     $(".aircraft-details-aircraft-registration-country").text("N/A").css({ left: "362px", "font-size": "var(--font-size-1)" });
    // }

    // function aircraftsRegistrationCtrFLAGNotFound() {
    //     $(".aircraft-details-aircraft-registration-country-flag").css("width", "0");
    // }

    try {
        const response = await fetch("/src/json/registration.json");
        const countriesData = await response.json();
        const registrationPrefix = registrationText.substring(0, 2);
        const matchingCountry = countriesData.find((country) => country.reg === registrationPrefix);

        if (pilot.flight_plan) {
            if (matchingCountry) {
                setCountryDetails(matchingCountry);
            } else {
                handleNoMatchingCountry();
                const oneCharRegistrationPrefix = registrationText.substring(0, 1);
                const oneCharMatchingCountry = countriesData.find((country) => country.reg === oneCharRegistrationPrefix);

                if (oneCharMatchingCountry) {
                    setCountryDetails(oneCharMatchingCountry);
                } else {
                    console.log("No matching country.");
                    handleNoMatchingCountry();
                }
            }
        } else {
            console.error("No flight plan, cannot get the aircraft's registration.");
            handleNoMatchingCountry();
        }
    } catch (error) {
        console.error("Error fetching countries data, most likely the aircraft does not have its registration filled in remarks.");
        handleNoMatchingCountry();
    }

    // Known bad registrations
    const knownBadRegistrations = ["PMDG738", "PMDG739", "B747", "PMDG737"];
    if (knownBadRegistrations.includes(registrationText)) {
        handleNoMatchingCountry();
    }

    $(".flight-data-heading").text(pilot.heading + "\u00B0");
    $(".text-details-route").text(pilot.flight_plan?.route || "N/A");
    $(".text-details-remarks").text(pilot.flight_plan?.remarks || "N/A");
    $(".aircraft-details-aircraft-name").text(pilot.flight_plan?.aircraft_short || "N/A");
    $(".rectangle-parent").fadeIn(200);
}
function implementNotFoundAirplaneData() {
    $(".airline-logo").css("display", "none");
    $(".f-airline").text("N/A");
}
async function getAirlineDataFromCallsign(callsign) {
    const firstThreeSymbols = callsign.substring(0, 3);
    try {
        const response = await fetch("/src/json/airlines.json");
        const data = await response.json();
        const matchingAirline = data.rows.find((airline) => airline.ICAO === firstThreeSymbols);
        if (matchingAirline) {
            return matchingAirline;
        } else {
            implementNotFoundAirplaneData();
        }
    } catch (error) {
        console.error("Error fetching airline data:", error);
        implementNotFoundAirplaneData();
    }
}
async function getAirportDataFromICAO() {
    try {
        const response = await fetch("/src/json/airports.json");
        const airportData = await response.json();
        const departureIcaoCode = $("#departureIcao").text();
        const arrivalIcaoCode = $("#arrivalIcao").text();
        // airportData = cachedAirports;
        const cleaningTheName = (airport) => {
            return airport.name.replace(/\bairport\b|\binternational\b|\bintercontinental\b|\bnational\b|\beuroairport\b/gi, "").trim();
        };
        const matchingDepartureAirport = airportData.rows.find((airport) => airport.icao === departureIcaoCode);
        const matchingArrivalAirport = airportData.rows.find((airport) => airport.icao === arrivalIcaoCode);
        if (matchingDepartureAirport) {
            const cleanedDepartureAirportName = cleaningTheName(matchingDepartureAirport);
            $(".d-a-departure").text(cleanedDepartureAirportName);
        } else {
            $("#departureIcao, .d-a-departure").text("N/A");
        }
        if (matchingArrivalAirport) {
            const cleanedArrivalAirportName = cleaningTheName(matchingArrivalAirport);
            $(".d-a-arrival").text(cleanedArrivalAirportName);
        } else {
            $("#arrivalIcao, .d-a-arrival").text("N/A");
        }
        return matchingArrivalAirport;
    } catch (error) {
        console.error("Error fetching airport data:", error);
    }
}
