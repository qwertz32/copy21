$.getJSON('https://phoenix-api.vatsim.net/api/events', function (data) {
    var currentDate = new Date();
    var defaultIcon = L.icon({
        iconUrl: '/src/img/event_marker_off.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -35],
    });
    var ongoingIcon = L.icon({
        iconUrl: '/src/img/event_marker_on.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
    var multipleIcon = L.icon({
        iconUrl: '/src/img/event_marker_multiple.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    function countEventsAtAirport(airportICAO, allEvents) {
        return allEvents.filter((event) =>
            event.airports &&
            Array.isArray(event.airports) &&
            event.airports.some((airport) => airport && airport.icao === airportICAO) &&
            event.endTime &&
            new Date(event.endTime) >= currentDate
        ).length;
    }

    function formatDate(dateString) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
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

            if (coords && processedAirports.indexOf(airport.icao) === -1) {
                var startTime = new Date(event.startTime);
                var endTime = new Date(event.endTime);
                var isActive = startTime <= currentDate && currentDate <= endTime;
                var icon = isActive ? ongoingIcon : defaultIcon;

                var eventsCount = countEventsAtAirport(airport.icao, data);

                if (eventsCount > 1) {
                    icon = multipleIcon;
                }

                var marker = L.marker(coords, { icon: icon }).addTo(map);

                var eventsList = data.filter((e) =>
                    e.airports && e.airports.some((a) => a && a.icao === airport.icao) &&
                    e.endTime && new Date(e.endTime) >= currentDate
                );

                marker.on('mouseover', function () {
                    var leafletPopup = `<b>Events at ${airport.name}, ${airport.city}, ${airport.icao}</b><br>`;
                    eventsList.forEach((e) => {
                        leafletPopup += `<br><b>${e.name}</b><br>${formatDate(e.startTime)} to ${formatDate(e.endTime)}`;
                    });
                    marker.bindPopup(leafletPopup, { closeButton: false }).openPopup();
                });

                marker.on('mouseout', function () {
                    marker.closePopup();
                });

                console.log(`Event pin put on airport: %c${airport.icao}`, 'font-weight: bold;');
                processedAirports.push(airport.icao);
            } else {
                console.log('No coords found for airport in event.');
            }
        });
    });
})
.fail(function (error) {
    console.error('Error fetching JSON:', error);
});
