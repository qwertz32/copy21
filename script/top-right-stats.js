$(document).ready(function () {
    function skibidi_data() {
        $.ajax({
            url: 'https://data.vatsim.net/v3/vatsim-data.json',
            dataType: 'json',
            success: function (data) {
                const pilotsCount = Object.keys(data.pilots).length;
                const atcCount = Object.keys(data.controllers).length;
    
                $('.t-r-s-airplane-count').text(pilotsCount);
                $('.t-r-s-atc-count').text(atcCount);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }
    skibidi_data();
    setInterval(skibidi_data, 90000);
});
