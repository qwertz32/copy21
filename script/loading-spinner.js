var loadingSpinnerShown = true
showLoadingSpinner()
function showLoadingSpinner() {
    if (!loadingSpinnerShown) {
        $('#loading-container').css('display', 'flex');
        $('#loading-spinner').fadeIn().css('display', 'flex');
    }
}
setTimeout(function () {
    showLoadingSpinner();
}, 100);