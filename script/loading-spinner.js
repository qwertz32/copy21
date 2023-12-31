var loadingSpinnerShown = false;

function showLoadingSpinner() {
    if (!loadingSpinnerShown) {
        $('#loading-container').css('display', 'flex');
        $('#loading-spinner').fadeIn().css('display', 'flex');
        loadingSpinnerShown = true;
    }
}
showLoadingSpinner()
function hideLoadingSpinner() {
    $('#loading-spinner').fadeOut(function() {
        $(this).css('display', 'none');
        $('#loading-container').fadeOut().css('display', 'none');
    });
};

setTimeout(function () {
    showLoadingSpinner();
}, 500);