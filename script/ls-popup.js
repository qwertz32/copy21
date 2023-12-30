let userResponse = '';

function shwPopUp() {
    if (localStorage.getItem('resp') === 'understood') {
        return; // Do not open the popup
    }
    $('#ls-popup').fadeIn();
    disableBg();
}

function clsPopUp() {
    $('#ls-popup').fadeOut();
    enableBg();
    userResponse = 'understood';
    localStorage.setItem('resp', userResponse.toString());
}

function disableBg() {
    $('#map').addClass('overlay-active');
    $('#everything').addClass('overlay-active');
}

function enableBg() {
    $('#map').removeClass('overlay-active');
    $('#everything').removeClass('overlay-active');
}

$(document).ready(function () {
    setTimeout(function () {
        shwPopUp();
    }, 0);

    $("#ls-popup-btn").click(function () {
        clsPopUp();
    });
});
