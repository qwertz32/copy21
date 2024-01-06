function getWeatherLayer() {
    const currentTime = Math.floor(Date.now() / (10 * 60 * 1000)) * (10 * 60 * 1000);

    // Construct the tile layer URL using the timestamp and Leaflet logic
    const weatherLayerUrl = `https://tilecache.rainviewer.com/v2/radar/${currentTime / 1000}/512/{z}/{x}/{y}/6/0_1.png`;

    // Check if the layer is already on the map
    const existingLayer = mapLayerControl.getLayer(weatherLayer);

    if (existingLayer) {
        // If it exists, remove it
        map.removeLayer(weatherLayer);
    } else {
        // If it doesn't exist, add it to the map
        weatherLayer = L.tileLayer(weatherLayerUrl, { attribution: 'Weather Layer' });
        weatherLayer.addTo(map);
    }
}
