$(document).ready(function () {
    $.ajax({
        url: 'https://data.vatsim.net/v3/vatsim-data.json',
        // url: '/src/examples/example-events.json',
        dataType: 'json',
        success: function (data) {
            // Count pilots
            // const pilotsCount = data.general.unique_users; counts all the users
            const pilotsCount = Object.keys(data.pilots).length;
            
            // Count ATC 
            const atcCount = Object.keys(data.controllers).length;

            $('.t-r-s-airplane-count').text(pilotsCount);
            $('.t-r-s-atc-count').text(atcCount);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
});
