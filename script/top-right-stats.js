$(document).ready(function () {
    function topRight() {
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
    topRight();
    setInterval(topRight, 90000);
    setTimeout(hideLoadingSpinner, 500); 
});
