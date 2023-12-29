
var defaultIcon = L.icon({
    iconUrl: '/src/img/event_marker_off.png',
    iconSize: [32, 32], 
    iconAnchor: [16, 32],
});
var ongoingIcon = L.icon({
    iconUrl: '/src/img/event_marker_on.png',
    iconSize: [32, 32], 
    iconAnchor: [16, 32],
});

$.getJSON('https://phoenix-api.vatsim.net/api/events', function (data) {
    var currentDate = new Date();

    $.each(data, function (index, event) {
        $.each(event.airports, function (index, airport) {
            var coords = airport.coords;
            var startTime = new Date(event.startTime);
            var endTime = new Date(event.endTime);
            var isOngoing = startTime <= currentDate && currentDate <= endTime;
            var icon = isOngoing ? ongoingIcon : defaultIcon;
            L.marker(coords, { icon: icon })
                .bindPopup(`<b>${event.name}</b><br>${airport.name}, ${airport.city}, ${airport.country}`)
                .addTo(map);
            console.log('Markers added.')
        });
    });
})
.fail(function (error) {
    console.error('Error fetching JSON:', error);
});
