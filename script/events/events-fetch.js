// events-fetch.js
$(document).ready(function () {
    $.ajax({
        url: '/src/examples/one-example-event.json', // Update the path to your JSON file
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log('Fetched data:', data);
            renderEvents(data[0]); // Access the first element of the array
        },
        error: function (error) {
            console.error('Error fetching JSON:', error);
        }
    });
});

function renderEvents(events) {
    var templateScript = $('#event-template').html();
    var template = Handlebars.compile(templateScript);
    var firstEvent = events[0];
    console.log('Data to be rendered:', firstEvent);
    var html = template(firstEvent);
    console.log('Rendered HTML:', html);
    $('.event-sidebox').append(html);
}
