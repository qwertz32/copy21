function showTime(clockClass) {
    const date = new Date();
    let h = date.getUTCHours();
    let m = date.getUTCMinutes();
    const day = date.getUTCDate();
    const monthShort = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    const minutesAndDate = day + ' ' + monthShort;

    const finalDate = `${h}:${m}Z , ${minutesAndDate}`;

    $(clockClass).text(finalDate);
}

$(document).ready(function () {
    showTime(".clock");

    setInterval(function () {
        showTime(".clock");
    }, 1000);
});
