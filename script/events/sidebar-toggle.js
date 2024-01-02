$(document).ready(function () {
    $('.hamburger-menu').click( function () {
        $('body').removeClass('hide-sidebar');
        $('body').toggleClass('show-sidebar');
        $('#sidebar-bg').css('display', 'block');
    });
    $('#sidebar-bg').click(function() {
        $('body').removeClass('show-sidebar');
        $('body').toggleClass('hide-sidebar');
        $('#sidebar-bg').css('display', 'none');
    });
});