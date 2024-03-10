let animationDuration = 500;
let updateInterval = 5000;

function toggleClocks() {
    const localClock = $(".local-clock");
    const zuluClock = $(".zulu-clock");

    if (localClock.is(":visible")) {
        localClock.fadeOut(animationDuration, function () {
            zuluClock.html(showZuluTime());
            zuluClock.fadeIn(animationDuration);
        });
    } else {
        zuluClock.fadeOut(animationDuration, function () {
            localClock.html(showLocalTime());
            localClock.fadeIn(animationDuration);
        });
    }
}

function showLocalTime() {
    const date = new Date();

    let localH = date.getHours();
    let localM = date.getMinutes();
    let localS = date.getSeconds();
    const localDay = date.getDate();
    const localMonthShort = new Intl.DateTimeFormat("en-US", {
        month: "short",
    }).format(date);

    localH = localH < 10 ? "0" + localH : localH;
    localM = localM < 10 ? "0" + localM : localM;
    localS = localS < 10 ? "0" + localS : localS;
    const localTime = `${localH}:${localM}:${localS}&nbsp; CET`;

    const localMinutesAndDate = localDay + " " + localMonthShort;

    return `${localTime} , ${localMinutesAndDate}`;
}

function showZuluTime() {
    const date = new Date();

    let zuluH = date.getUTCHours();
    let zuluM = date.getUTCMinutes();
    let zuluS = date.getUTCSeconds();
    const zuluDay = date.getUTCDate();
    const zuluMonthShort = new Intl.DateTimeFormat("en-US", {
        month: "short",
        timeZone: "UTC",
    }).format(date);
    zuluH = zuluH < 10 ? "0" + zuluH : zuluH;
    zuluM = zuluM < 10 ? "0" + zuluM : zuluM;
    zuluS = zuluS < 10 ? "0" + zuluS : zuluS;
    const zuluTime = `${zuluH}:${zuluM}:${zuluS} Zulu`;
    const zuluMinutesAndDate = zuluDay + " " + zuluMonthShort;
    return `${zuluTime} , ${zuluMinutesAndDate}`;
}

$(document).ready(function () {
    $(".local-clock").html(showLocalTime());
    setInterval(function () {
        toggleClocks();
    }, updateInterval);
    setInterval(function () {
        if ($(".local-clock").is(":visible")) {
            $(".local-clock").html(showLocalTime());
        } else {
            $(".zulu-clock").html(showZuluTime());
        }
    }, 1000);
});
