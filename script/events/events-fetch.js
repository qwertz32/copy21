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
    // Use Handlebars to render the first event box
    var templateScript = $('#event-template').html();
    var template = Handlebars.compile(templateScript);
    
    // Access the first event in the array
    var firstEvent = events[0];
    
    // Log the data to be rendered for the first event
    console.log('Data to be rendered:', firstEvent);
    
    // Render the HTML for the first event
    var html = template(firstEvent);
    console.log('Rendered HTML:', html);
    
    // Append the HTML to the event-sidebox
    $('.event-sidebox').append(html);
}
