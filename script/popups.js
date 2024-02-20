let userResponse;

(function shwPopUp() {
    try {
        const resp = localStorage.getItem("resp");
        if (resp === "understood") {
            return; // Do not open the popup
        } else {
            $("#ls-popup").fadeIn();
        }
    } catch (error) {
        $("#cd-popup").fadeIn();
        console.error("Local Storage not accessible.");
    }
});

(function clsPopUp() {
    $("#ls-popup").fadeOut();

    userResponse = "understood";
    localStorage.setItem("resp", userResponse.toString());
})(function clsCdPopUp() {
    $("#cd-popup").fadeOut();
});
$(document).ready(function () {
    shwPopUp();

    $("#ls-popup-btn").click(function () {
        clsPopUp();
    });
});
