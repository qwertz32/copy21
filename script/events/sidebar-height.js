$(document).ready(function () {
    function setEventSideboxPosition() {
        var navbarHeight = $('.nav-bar-main').outerHeight();
        $('.event-sidebox').css('top', navbarHeight + 'px');
    }
    setEventSideboxPosition();
    $(window).resize(function () {
        setEventSideboxPosition();
    });
});