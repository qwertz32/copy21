$.getJSON("https://phoenix-api.vatsim.net/api/events", function (data) {
    var currentDate = new Date();
    var defaultIcon = L.icon({
        iconUrl: "src/img/assets/events/event_marker_off.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -35],
    });
    var ongoingIcon = L.icon({
        iconUrl: "/src/img/assets/events/event_marker_on.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
    var multipleIcon = L.icon({
        iconUrl: "/src/img/assets/events/event_marker_multiple.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    function countEventsAtAirport(airportICAO, allEvents) {
        return allEvents.filter(
            (event) =>
                event.airports &&
                Array.isArray(event.airports) &&
                event.airports.some((airport) => airport && airport.icao === airportICAO) &&
                event.endTime &&
                new Date(event.endTime) >= currentDate,
        ).length;
    }

    function formatDate(dateString) {
        var day = String(new Date(dateString).getDate()).padStart(2, "0");
        var month = String(new Date(dateString).getMonth() + 1).padStart(2, "0");
        var time = new Date(dateString).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", hour12: false });
        return `${day}.${month} ${time}`;
    }

    function findAirportsInEvent(event) {
        if (!event.airports || !Array.isArray(event.airports)) {
            return [];
        }

        return event.airports.filter((airport) => airport && airport.coords);
    }

    var processedAirports = [];

    $.each(data, function (index, event) {
        var airportsInEvent = findAirportsInEvent(event);

        airportsInEvent.forEach(function (airport) {
            var coords = airport.coords;
            console.log(coords);

            if (coords && processedAirports.indexOf(airport.icao) === -1) {
                var startTime = new Date(event.startTime);
                var endTime = new Date(event.endTime);
                var isActive = startTime <= currentDate && currentDate <= endTime;
                var eventsListForAirport = data.filter(
                    (e) => e.airports && e.airports.some((a) => a && a.icao === airport.icao) && e.endTime && new Date(e.endTime) >= currentDate,
                );
                var eventsCount = countEventsAtAirport(airport.icao, data);
                var hasActiveEvent = eventsListForAirport && eventsListForAirport.some((e) => startTime <= currentDate && currentDate <= endTime);
                if (isActive) {
                    icon = ongoingIcon;
                } else if (hasActiveEvent) {
                    icon = ongoingIcon;
                } else if (eventsCount > 1) {
                    icon = multipleIcon;
                } else {
                    icon = defaultIcon;
                }
                var marker = L.marker(coords, { icon: icon }).addTo(map);

                var eventsList = data.filter(
                    (e) => e.airports && e.airports.some((a) => a && a.icao === airport.icao) && e.endTime && new Date(e.endTime) >= currentDate,
                );

                marker.on("mouseover", function () {
                    var leafletPopup = `<b>${airport.name}, ${airport.city} <br>${airport.icao}</b><br>`;
                    eventsList.forEach((e) => {
                        leafletPopup += `<br><b>${e.name}</b><br><b>${formatDate(e.startTime)}</b> to <b>${formatDate(e.endTime)}</b>`;
                    });
                    var customEventPopup = {
                        className: "custom-event-popup",
                        closeButton: false,
                    };
                    marker.bindPopup(leafletPopup, customEventPopup).openPopup();
                });

                marker.on("mouseout", function () {
                    marker.closePopup();
                });

                marker.on("click", function () {
                    openPreciseOverlay();
                });
                $(".precise-close-btn").click(function () {
                    closePreciseOverlay();
                });
                $(".precise-overlay-bg").click(function () {
                    closePreciseOverlay();
                });
                console.log(`Event pin put on airport: %c${airport.icao}`, "font-weight: bold;");
                processedAirports.push(airport.icao);
            } else {
                console.log("No coords found for airport in event.");
            }
        });
    });
}).fail(function (error) {
    console.error("Error fetching JSON:", error);
});
function openPreciseOverlay() {
    $(".precise-overlay").fadeIn();
    $(".precise-overlay-bg").fadeIn();
}
function closePreciseOverlay() {
    $(".precise-overlay").fadeOut();
    $(".precise-overlay-bg").fadeOut();
}
