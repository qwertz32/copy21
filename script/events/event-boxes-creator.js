(function () {
    const dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    function getEvents() {
        $(document).ready(() => {
            $.ajax({
                url: "https://phoenix-api.vatsim.net/api/events",
                method: "GET",
                dataType: "json",
                success: (data) => {
                    console.log("Fetched data:", data);
                    renderEvents(data);
                    time = new Date().getTime();
                    localStorage.setItem("event-timestamp", time);
                },
                error: (error) => console.error("Error fetching JSON:", error),
            });

            function renderEvents(events) {
                const categories = {
                    today: [],
                    tomorrow: [],
                };

                const dateMap = {};
                events.forEach((event) => {
                    const eventDate = new Date(event.startTime).toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                    });

                    const todayDate = new Date();
                    const tomorrowDate = new Date(todayDate);
                    tomorrowDate.setDate(todayDate.getDate() + 1);

                    const isToday = eventDate === todayDate.toLocaleDateString("en-US", dateOptions);
                    const isTomorrow = eventDate === tomorrowDate.toLocaleDateString("en-US", dateOptions);

                    if (isToday) {
                        categories.today.push(event);
                    } else if (isTomorrow) {
                        categories.tomorrow.push(event);
                    } else {
                        dateMap[eventDate] = dateMap[eventDate] || [];
                        dateMap[eventDate].push(event);
                    }
                });

                renderCategory("Today", categories.today);
                renderCategory("Tomorrow", categories.tomorrow);
                for (const [date, events] of Object.entries(dateMap)) {
                    renderCategory(date, events);
                }
            }

            function renderCategory(category, events) {
                if (events.length === 0) {
                    return;
                }
                const templateScript = $("#event-template").html();
                const template = Handlebars.compile(templateScript);
                const categoryHtml = `<h2 class="sidebar-category-name">${category}</h2>${events
                    .map((event) =>
                        template({
                            ...event,
                            shortDescription: event.shortDescription.replace(/<[^>]*>/g, ""),
                            isActive: new Date(event.startTime) <= new Date() && new Date(event.endTime) >= new Date(),
                        }),
                    )
                    .join("")}`;

                const categoryElement = $('<div class="event-category"></div>').html(categoryHtml).appendTo("#event-boxes-container");

                categoryElement.find(".event-box-icaos-single").click(function () {
                    const icaos = $(this)
                        .text()
                        .trim()
                        .split(/\s*,\s*/);
                    console.log("Clicked ICAOs:", icaos);
                    icaos.forEach((icao) => {
                        const trimmedIcao = icao.trim(); // Trim whitespace from each ICAO code
                        console.log("Clicked ICAO:", trimmedIcao);
                        const event = events.find((event) => event.airports.some((airport) => airport.icao === trimmedIcao));
                        if (event) {
                            const airport = event.airports.find((a) => a.icao === trimmedIcao);
                            if (airport) {
                                const coords = airport.coords;
                                console.log("Airport Coordinates:", coords);
                                // Assuming you have a function to teleport the user on your Leaflet.js map
                                map.setView(coords, 13);
                                return; // Exit the loop if the correct airport is found
                            }
                        }
                    });
                });

                categoryElement.find(".event-box-icaos-single").hover(
                    function () {
                        const icao = $(this).text().trim();
                        const airport = findAirportByIcao(events, icao);
                        if (airport) {
                            const fullName = airport.fullName;
                            // Display the full name of the airport however you want (e.g., tooltip, console.log, etc.)
                            console.log("Airport Full Name:", fullName);
                        }
                    },
                    function () {
                        // Remove the displayed full name if necessary
                    },
                );
            }
        });
    }
    setInterval(function () {
        getEvents();
    }, 180000);

    document.addEventListener("DOMContentLoaded", function () {
        var date = new Date();
        var hour = date.getHours();
        var minute = "0" + date.getMinutes();
        var fTime = hour + ":" + minute.substr(-2);

        function checkIfEventsOutdated() {
            const storedEventTime = localStorage.getItem("event-timestamp");
            if (storedEventTime) {
                const storedTime = storedEventTime;
                const currentTime = new Date().getTime();
                if (storedTime < currentTime) {
                    $("#event-boxes-timeOfFetch")
                        .html('The data <span class="s32">might</span> be outdated as it was taken at' + " " + fTime + "<br>" + "Click to reload")
                        .css("cursor", "pointer");
                }
            }
        }
        if ($("#event-boxes-timeOfFetch").html().length > 0) {
            return;
        } else {
            setInterval(function () {
                checkIfEventsOutdated();
                console.log("checked :)");
            }, 180000);
        }
    });

    getEvents();
})();

function findAirportByIcao(events, icao) {
    for (const event of events) {
        for (const airport of event.airports) {
            if (airport.icao === icao) {
                return airport;
            }
        }
    }
    return null;
}
