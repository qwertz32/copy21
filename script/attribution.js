$(document).ready(() => {
    function currentVersionToAttribution() {
        let attributionVersionText;
        $.ajax({
            url: "/version.json",
            dataType: "json",
            success: function (data) {
                attributionVersionText = "V" + data.ver + ", Build: " + data.build + " |";
                console.log("built the attributionVerText correctly");
                const attributionText = `${attributionVersionText} <a taget="_blank" href="https://github.com/skerretoo/TimeShow">Github</a> | <a href="https://leafletjs.com/" target="_blank">Leaflet</a>`;
                const atrCtrl = L.control.attribution({ position: "topright" }).addTo(map);
                atrCtrl.setPrefix(attributionText);
                loadingVersionText = attributionVersionText.slice(0, -1);
                $("#loading-build-info").text(loadingVersionText);
            },
            error: function () {
                console.log("errored");
                $("#loading-build-info").text("");
            },
        });
    }

    currentVersionToAttribution();
});
