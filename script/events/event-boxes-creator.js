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

                $('<div class="event-category"></div>').html(categoryHtml).appendTo("#event-boxes-container");
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
                    $("#event-boxes-timeOfFetch").html(
                        'The data <span class="s32">might</span> be outdated as it was taken at' + " " + fTime + "<br>" + "Click to reload",
                    );
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
