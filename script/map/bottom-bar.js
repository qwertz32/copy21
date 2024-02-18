$(document).ready(() => {
    const imageClass = $(".bottom-tower-image");
    const maxScale = "scale(1.4)";
    const middleScale = "scale(1.2)";
    const deafultScale = "unset";
    const deafultImage = "/src/img/assets/map/tower-control.png";
    const GreenImageVersion = "/src/img/assets/map/tower-control-green.png";
    const BlueImageVersion = "/src/img/assets/map/tower-control-blue.png";
    const t = "transform";
    const s = "src";

    imageClass.hover(
        function () {
            $(this)
                .attr(s, BlueImageVersion)
                .css({ [t]: maxScale });
        },
        function () {
            $(this)
                .attr(s, deafultImage)
                .css({ [t]: deafultScale });
        },
    );
    imageClass.on("mousedown", function () {
        $(this)
            .attr(s, GreenImageVersion)
            .css({ [t]: middleScale });
    });
    imageClass.on("mouseup", function () {
        $(this)
            .attr(s, BlueImageVersion)
            .css({ [t]: maxScale });
    });
    imageClass.on("mouseleave", function () {
        $(this)
            .attr(s, deafultImage)
            .css({ [t]: deafultScale });
    });
});
