function hideLoadingSpinner() {
    $('#loading-spinner').fadeOut(function() {
        $(this).css('display', 'none');
        $('#loading-container').fadeOut().css('display', 'none');
    });
};

(function() {
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
                    var countryFlag = (`/src/img/flags/${userCountry}_flag.png`)
                    var newAttribution = currentAttribution + ' | ' + `<img src="${countryFlag}" alt="${userCountry} flag">` + ' ' + userCountry;
                    attributionContainer.html(newAttribution);
                    console.log("Successfully implemented user's country code.")
                } else {
                    console.error(error);

                }

            },
            error: function(jqXHR, error) {
                if (jqXHR.status === 0) {
                    console.error("Disable your Adblock to see your country's code and a nice little flag");
                } else {
                    console.error('Error fetching country.', error);
                }
            }
        });
    }

    getCountry();
})();
