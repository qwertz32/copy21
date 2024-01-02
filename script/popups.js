let userResponse = '';

function shwPopUp() {
    try {
        if (!localStorage) {
            console.error("nope")
        }
        if (localStorage.getItem('resp') === 'understood') {
            return; // Do not open the popup
        }
        if (localStorage.getItem('resp') === null) {
            $('#ls-popup').fadeIn();
        } 
    } catch (error) {
        $('#cd-popup').fadeIn();
        console.error("Local Storage not accessible.");
    }
};


function clsPopUp() {
    $('#ls-popup').fadeOut();

    userResponse = 'understood';
    localStorage.setItem('resp', userResponse.toString());
}
function clsCdPopUp() {
    $('#cd-popup').fadeOut();
}
$(document).ready(function () {
    setTimeout(function () {
        shwPopUp();
    }, 0);

$("#ls-popup-btn").click(function () {
    clsPopUp();
});
});
