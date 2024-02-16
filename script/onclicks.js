$(document).ready(() => {
    $("#event-boxes-timeOfFetch").click(function () {
        window.location.reload();
    });
    $(".menu-icon").click(function () {
        $(".menu-options").fadeToggle();
    });
});
