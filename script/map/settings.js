initialZoom = parseFloat(storedZoom) || presetZoom;
map = L.map('map', {
    zoomControl: false,
    zoomSnap: 0.20,
    zoomDelta: 0.75
}).setView(initialCoordinates, initialZoom);
