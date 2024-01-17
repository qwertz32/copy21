import { showPreciseFlightInfo } from "./plane-placement.js";
let cachedData, zoomLevel;
let selectedPlane = null;
let previousSearchTerm = '';

const planesIcon = L.icon({
    iconUrl: '/src/img/B789-high-compress.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -5],
});

function searchFun(callsign) {
    if (cachedData) {
        const uppercaseCallsign = callsign.toUpperCase();
        const foundPilot = cachedData.pilots.find(pilot => pilot.callsign === uppercaseCallsign);
        if (foundPilot) {
            showPreciseFlightInfo(foundPilot);
            const pilotLatLng = L.latLng(foundPilot.latitude, foundPilot.longitude);
            map.whenReady(() => {
                zoomLevel = 15;
                map.setView(pilotLatLng, zoomLevel);
                selectedPlane = uppercaseCallsign;
            });
        }
    } else {
        console.error(error);
    }
}

function liveSearch(results) {
    const resultsContainer = $('#searchResults');
    resultsContainer.empty();

    if (results.length === 0) {
        resultsContainer.hide();
        return;
    }

    results.sort((a, b) => a.callsign.localeCompare(b.callsign));

    results.forEach(result => {
        const resultBox = $('<div class="result-box"></div>');
        resultBox.text(result.callsign);
        resultBox.click(() => searchFun(result.callsign));

        resultsContainer.append(resultBox);
    });

    resultsContainer.show();
}

$(document).ready(function () {
    $(document).on('click', function (event) {
        const searchInput = $('#searchInput');
        const results = $('#searchResults');
        if (!searchInput.is(event.target) && !results.is(event.target) && results.has(event.target).length === 0) {
            results.hide();
        }
    });

    $('#searchInput').keyup(function (event) {
        if (event.keyCode === 13) {
            const searchTerm = $(this).val().toUpperCase();
            searchFun(searchTerm);
        } else {
            const searchTerm = $(this).val().toUpperCase();
            previousSearchTerm = searchTerm;
            const fResults = cachedData.pilots.filter(pilot =>
                pilot.callsign.includes(searchTerm)
            );

            liveSearch(fResults);
        }
    });

    $('#searchInput').on('focus', function () {
        const searchTerm = previousSearchTerm;
        const fResults = cachedData.pilots.filter(pilot =>
            pilot.callsign.includes(searchTerm)
        );
        liveSearch(fResults);
        if (previousSearchTerm) {
            $(this).val(previousSearchTerm);
        }
    });

    fetch('https://data.vatsim.net/v3/vatsim-data.json')
        .then(response => response.json())
        .then(data => {
            cachedData = data;
        })
        .catch(error => console.error(error));
});
