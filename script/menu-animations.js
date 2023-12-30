var menuOptions = $('.menu-options');
$(".menu-icon").click(function () {
    $(".menu-options").slideToggle();
});

$(document).click(function (event) {
    if (!$(event.target).closest('.menu-icon, .menu-options').length) {
        $(".menu-options").slideUp();
    }
});