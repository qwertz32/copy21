var loadingSpinnerShown = true
showLoadingSpinner()
function showLoadingSpinner() {
    if (!loadingSpinnerShown) {
        $('#loading-container').css('display', 'flex');
        $('#loading-spinner').fadeIn().css('display', 'flex');
    }
}
function hideLoadingSpinner() {
    $('#loading-spinner').fadeOut(function() {
        $(this).css('display', 'none');
        $('#loading-container').fadeOut().css('display', 'none');
    });
};

setTimeout(function () {
    showLoadingSpinner();
}, 100);