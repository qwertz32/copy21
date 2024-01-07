function hideLoadingSpinner() {
    $('#loading-spinner').fadeOut(function() {
        $(this).css('display', 'none');
        $('#loading-container').fadeOut().css('display', 'none');
    });
};

var ipToken = '57181dfc23ba47';
function getCountry() {
    $.ajax({
        url: 'https://ipinfo.io/json?token=' + ipToken,
        dataType: 'json',
        success: function(data2) {
            var userCountry = data2.country || '';
            console.log("Country code:", userCountry);
            if (userCountry !== null) {
                var attributionContainer = $('.leaflet-control-attribution');
                var currentAttribution = attributionContainer.html();
                var newAttribution = currentAttribution + ' | ' + userCountry;
                attributionContainer.html(newAttribution);
                console.log("Successfuly implemented user's country code.")
            } else {
                console.error(error);
                hideLoadingSpinner();
            }
            hideLoadingSpinner();
        },
        error: function(error) {
            console.error('Error fetching country.\n', error);
            hideLoadingSpinner();
        }
    });
}

getCountry();