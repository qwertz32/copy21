$(document).ready(() => {
    $.ajax({
        url: 'https://phoenix-api.vatsim.net/api/events',
        method: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log('Fetched data:', data);
            renderEvents(data);
        },
        error: (error) => console.error('Error fetching JSON:', error)
    });
});
function renderEvents(events) {
    const categories = {
        today: [],
        tomorrow: [],
    };
    const dateMap = {};
    events.forEach((event) => {
        const eventDate = new Date(event.startTime).toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });

        const todayDate = new Date();
        const tomorrowDate = new Date(todayDate);
        tomorrowDate.setDate(todayDate.getDate() + 1);

        const isToday = eventDate === todayDate.toLocaleDateString('en-US', dateOptions);
        const isTomorrow = eventDate === tomorrowDate.toLocaleDateString('en-US', dateOptions);

        if (isToday) {
            categories.today.push(event);
        } else if (isTomorrow) {
            categories.tomorrow.push(event);
        } else {
            dateMap[eventDate] = dateMap[eventDate] || [];
            dateMap[eventDate].push(event);
        }
    });
    renderCategory('Today', categories.today);
    renderCategory('Tomorrow', categories.tomorrow);
    for (const [date, events] of Object.entries(dateMap)) {
        renderCategory(date, events);
    }
}
function renderCategory(category, events) {
    const templateScript = $('#event-template').html();
    const template = Handlebars.compile(templateScript);
    const categoryHtml = `<h2 class="sidebar-category-name">${category}</h2>${events.map(event => template({
        ...event,
        shortDescription: event.shortDescription.replace(/<[^>]*>/g, ''),
    })).join('')}`;

    $('<div class="event-category"></div>').html(categoryHtml).appendTo('.event-sidebox');
}
const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
};