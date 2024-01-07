$(document).ready(function () {
    $('.hamburger-menu').click(function () {
        if ($('body').hasClass('show-sidebar')) {
            $('body').removeClass('show-sidebar').addClass('hide-sidebar');
            $('#sidebar-bg').css('display', 'none');
        } else {
            $('body').removeClass('hide-sidebar').addClass('show-sidebar');
            $('#sidebar-bg').css('display', 'block');
        }
    });
    $('#sidebar-bg').click(function() {
        $('body').removeClass('show-sidebar').addClass('hide-sidebar');
        $('#sidebar-bg').css('display', 'none');
    });
});
