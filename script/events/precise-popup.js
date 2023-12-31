
function openThePopup(eventId) {
    const selectedEvent = jsonData.find(event => event.id === eventId);
    if (selectedEvent) {
        fetchAdditionalEventData(selectedEvent);
    }
}
function fetchAdditionalEventData(event) {
    const popupData = {
        image: event.bannerLink,
        title: event.name,
        description: event.description
    };
    openThePopup(popupData);
}
